import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Mock AI suggestions based on carbon data patterns
function generateSuggestions(carbonData: any): any[] {
  const { transport_emissions, energy_emissions, diet_emissions, total_emissions } = carbonData;
  const suggestions = [];

  // Transport suggestions
  if (transport_emissions > total_emissions * 0.4) {
    suggestions.push({
      category: 'transport',
      title: 'Switch to public transit twice a week',
      description: 'Based on your commuting patterns, you could reduce your carbon footprint by taking the bus or train on Tuesdays and Thursdays.',
      impact: 'high',
      estimatedReduction: Math.round(transport_emissions * 0.3),
      difficulty: 'medium'
    });
  }

  // Energy suggestions
  if (energy_emissions > total_emissions * 0.3) {
    suggestions.push({
      category: 'energy',
      title: 'Install a smart thermostat',
      description: 'Your home heating and cooling patterns suggest you could save up to 15% on energy by installing a smart thermostat.',
      impact: 'high',
      estimatedReduction: Math.round(energy_emissions * 0.15),
      difficulty: 'medium'
    });
  }

  // Diet suggestions
  if (diet_emissions > total_emissions * 0.25) {
    suggestions.push({
      category: 'diet',
      title: 'Try Meatless Monday',
      description: 'Reducing meat consumption by one day per week could significantly lower your dietary carbon footprint.',
      impact: 'medium',
      estimatedReduction: Math.round(diet_emissions * 0.2),
      difficulty: 'easy'
    });
  }

  // General suggestions
  suggestions.push({
    category: 'other',
    title: 'Switch to paperless billing',
    description: 'Opt for digital statements and bills to reduce paper waste and associated emissions.',
    impact: 'low',
    estimatedReduction: 2,
    difficulty: 'easy'
  });

  return suggestions.slice(0, 3); // Return top 3 suggestions
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get request body
    const { carbonEntryId } = await req.json();

    if (!carbonEntryId) {
      return new Response(
        JSON.stringify({ error: 'Carbon entry ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get carbon entry data
    const { data: carbonEntry, error: carbonError } = await supabase
      .from('carbon_data')
      .select('*')
      .eq('id', carbonEntryId)
      .single();

    if (carbonError || !carbonEntry) {
      return new Response(
        JSON.stringify({ error: 'Carbon entry not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate AI suggestions (mock implementation)
    const suggestions = generateSuggestions(carbonEntry);

    // In a real implementation, you would call OpenAI API here:
    /*
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{
          role: 'user',
          content: `Based on carbon footprint data: ${JSON.stringify(carbonEntry)}, provide 3 personalized reduction suggestions.`
        }],
        temperature: 0.7,
      }),
    });
    */

    return new Response(
      JSON.stringify({
        success: true,
        suggestions,
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('AI suggestion error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});