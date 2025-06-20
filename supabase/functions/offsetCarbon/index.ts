import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { verify } from 'npm:jsonwebtoken@9.0.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Mock offset providers with their pricing
const OFFSET_PROVIDERS = [
  { name: 'Green Forest Initiative', pricePerTon: 15 },
  { name: 'Solar Future Project', pricePerTon: 18 },
  { name: 'Wind Power Alliance', pricePerTon: 12 },
  { name: 'Ocean Conservation Fund', pricePerTon: 20 },
];

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

    const token = authHeader.split(' ')[1];
    const decoded = verify(token, Deno.env.get('JWT_SECRET') ?? '') as { userId: string };

    // Get request body
    const { kgCO2e } = await req.json();

    if (!kgCO2e || kgCO2e <= 0) {
      return new Response(
        JSON.stringify({ error: 'Valid kg CO2e amount is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Select a random provider
    const provider = OFFSET_PROVIDERS[Math.floor(Math.random() * OFFSET_PROVIDERS.length)];
    
    // Calculate cost (convert kg to tons for pricing)
    const cost = (kgCO2e / 1000) * provider.pricePerTon;

    // Store transaction
    const { data: transaction, error } = await supabase
      .from('offset_transactions')
      .insert({
        user_id: decoded.userId,
        kg_co2e: kgCO2e,
        cost: cost,
        provider: provider.name,
      })
      .select('id, created_at')
      .single();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        transaction: {
          id: transaction.id,
          provider: provider.name,
          kgCO2e,
          cost: cost.toFixed(2),
          timestamp: transaction.created_at,
        },
        message: `Successfully offset ${kgCO2e} kg of CO2e through ${provider.name}`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Carbon offset error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});