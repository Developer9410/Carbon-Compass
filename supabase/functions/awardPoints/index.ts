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

// Point values for different actions
const POINT_VALUES = {
  carbon_entry: 50,
  footprint_reduction: 100,
  challenge_completion: 200,
  carbon_offset: 150,
  community_post: 25,
  streak_milestone: 75,
  level_up: 500,
};

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

    const token = authHeader.replace('Bearer ', '');
    
    // Get user from token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get request body
    const { actionType, description, carbonEntryId, metadata } = await req.json();

    if (!actionType || !description) {
      return new Response(
        JSON.stringify({ error: 'Action type and description are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate points based on action type
    let points = POINT_VALUES[actionType as keyof typeof POINT_VALUES] || 10;

    // Apply multipliers based on metadata
    if (metadata?.multiplier) {
      points *= metadata.multiplier;
    }

    // Create point transaction
    const { data: transaction, error: transactionError } = await supabase
      .from('point_transactions')
      .insert({
        user_id: user.id,
        points,
        action_type: actionType,
        description,
        carbon_entry_id: carbonEntryId || null,
      })
      .select('id, created_at')
      .single();

    if (transactionError) {
      throw transactionError;
    }

    // Update user's total points
    const { data: userData, error: userDataError } = await supabase
      .from('users')
      .select('points')
      .eq('id', user.id)
      .single();

    if (userDataError) {
      throw userDataError;
    }

    const newTotal = (userData.points || 0) + points;

    const { error: updateError } = await supabase
      .from('users')
      .update({ points: newTotal })
      .eq('id', user.id);

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        pointsAwarded: points,
        newTotal,
        transactionId: transaction.id,
        message: `You earned ${points} Green Points for ${description}!`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Points award error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});