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
    const { rewardId } = await req.json();

    if (!rewardId) {
      return new Response(
        JSON.stringify({ error: 'Reward ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get reward details
    const { data: reward, error: rewardError } = await supabase
      .from('rewards')
      .select('*')
      .eq('id', rewardId)
      .eq('active', true)
      .single();

    if (rewardError || !reward) {
      return new Response(
        JSON.stringify({ error: 'Reward not found or inactive' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user's current points
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('points')
      .eq('id', decoded.userId)
      .single();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user has enough points
    if (user.points < reward.points_cost) {
      return new Response(
        JSON.stringify({ 
          error: 'Insufficient points',
          required: reward.points_cost,
          available: user.points
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate redemption code
    const redemptionCode = `CC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create redemption record
    const { data: redemption, error: redemptionError } = await supabase
      .from('reward_redemptions')
      .insert({
        user_id: decoded.userId,
        reward_id: rewardId,
        points_spent: reward.points_cost,
        redemption_code: redemptionCode,
        status: 'confirmed',
      })
      .select('id, created_at')
      .single();

    if (redemptionError) {
      throw redemptionError;
    }

    // Deduct points from user
    const newPointsTotal = user.points - reward.points_cost;
    const { error: updateError } = await supabase
      .from('users')
      .update({ points: newPointsTotal })
      .eq('id', decoded.userId);

    if (updateError) {
      throw updateError;
    }

    // Create negative point transaction for the redemption
    const { error: transactionError } = await supabase
      .from('point_transactions')
      .insert({
        user_id: decoded.userId,
        points: -reward.points_cost,
        action_type: 'reward_redemption',
        description: `Redeemed: ${reward.name}`,
      });

    if (transactionError) {
      console.error('Transaction error:', transactionError);
      // Don't fail the redemption if transaction logging fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        redemption: {
          id: redemption.id,
          rewardName: reward.name,
          pointsSpent: reward.points_cost,
          redemptionCode,
          timestamp: redemption.created_at,
        },
        newPointsTotal,
        message: `Successfully redeemed ${reward.name}! Your redemption code is: ${redemptionCode}`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Reward redemption error:', error);
    
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