import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase environment variables are not set.');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

interface TransportInput {
  type: string;
  distance: number;
  frequency: string;
  passengers?: number;
  fuelType?: string;
}

interface EnergyInput {
  type: string;
  amount: number;
  unit: string;
  renewable: boolean;
  period: string;
}

interface DietInput {
  meatConsumption: string;
  dairyConsumption: string;
  localFoodPercentage: number;
  wastePercentage: number;
}

interface RequestBody {
  transport: TransportInput;
  energy: EnergyInput;
  diet: DietInput;
}

const EMISSION_FACTORS = {
  transport: {
    car: { gasoline: 0.2, diesel: 0.22, electric: 0.05, hybrid: 0.12 },
    bus: 0.08,
    train: 0.04,
    plane: 0.25,
    bike: 0,
    walk: 0,
  },
  energy: {
    electricity: 0.4,
    heating: 0.2,
    cooling: 0.3,
  },
  diet: {
    meat: { high: 3.3, medium: 2.5, low: 1.7, none: 1.0 },
    dairy: { high: 1.5, medium: 1.0, low: 0.5, none: 0.1 },
  },
};

const FREQUENCY_MULTIPLIERS = { daily: 30, weekly: 4, monthly: 1, once: 1 };
const PERIOD_MULTIPLIERS = { daily: 30, weekly: 4, monthly: 1 };

function calculateTransportEmissions(transport: TransportInput): number {
  const { type, distance, frequency, passengers = 1, fuelType = 'gasoline' } = transport;
  let factor = 0;

  if (type === 'car' && !EMISSION_FACTORS.transport.car[fuelType as keyof typeof EMISSION_FACTORS.transport.car]) {
    throw new Error(`Invalid fuel type for car: ${fuelType}. Expected: gasoline, diesel, electric, hybrid.`);
  }
  if (type === 'car') {
    factor = EMISSION_FACTORS.transport.car[fuelType as keyof typeof EMISSION_FACTORS.transport.car];
  } else if (EMISSION_FACTORS.transport[type as keyof typeof EMISSION_FACTORS.transport]) {
    factor = EMISSION_FACTORS.transport[type as keyof typeof EMISSION_FACTORS.transport] as number;
  } else {
    throw new Error(`Invalid transport type: ${type}. Expected: car, bus, train, plane, bike, walk.`);
  }

  if (passengers < 1) throw new Error('Passengers must be at least 1');
  factor /= passengers;
  const multiplier = FREQUENCY_MULTIPLIERS[frequency as keyof typeof FREQUENCY_MULTIPLIERS] || 1;
  return factor * distance * multiplier;
}

function calculateEnergyEmissions(energy: EnergyInput): number {
  const { type, amount, renewable, period } = energy;
  const factor = EMISSION_FACTORS.energy[type as keyof typeof EMISSION_FACTORS.energy];
  if (!factor) throw new Error(`Invalid energy type: ${type}. Expected: electricity, heating, cooling.`);

  const adjustedFactor = renewable ? factor * 0.2 : factor;
  const multiplier = PERIOD_MULTIPLIERS[period as keyof typeof PERIOD_MULTIPLIERS] || 1;
  if (amount < 0) throw new Error('Amount cannot be negative');
  return adjustedFactor * amount * multiplier;
}

function calculateDietEmissions(diet: DietInput): number {
  const { meatConsumption, dairyConsumption, localFoodPercentage, wastePercentage } = diet;
  const meatFactor = EMISSION_FACTORS.diet.meat[meatConsumption as keyof typeof EMISSION_FACTORS.diet.meat];
  const dairyFactor = EMISSION_FACTORS.diet.dairy[dairyConsumption as keyof typeof EMISSION_FACTORS.diet.dairy];

  if (!meatFactor) throw new Error(`Invalid meat consumption: ${meatConsumption}. Expected: high, medium, low, none.`);
  if (!dairyFactor) throw new Error(`Invalid dairy consumption: ${dairyConsumption}. Expected: high, medium, low, none.`);

  let total = meatFactor + dairyFactor;
  if (localFoodPercentage < 0 || localFoodPercentage > 100) throw new Error('Local food percentage must be 0-100%');
  total *= (1 - (localFoodPercentage / 100) * 0.2);
  if (wastePercentage < 0 || wastePercentage > 100) throw new Error('Waste percentage must be 0-100%');
  total *= (1 + (wastePercentage / 100) * 0.1);
  return total * 30;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ success: false, error: 'Authorization required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      console.error('Auth error:', userError);
      return new Response(JSON.stringify({ success: false, error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = user.id;
    const body: RequestBody = await req.json();
    const { transport, energy, diet } = body;

    if (!transport?.type || !transport?.distance || !transport?.frequency ||
        !energy?.type || !energy?.amount || !energy?.period ||
        !diet?.meatConsumption || !diet?.dairyConsumption) {
      return new Response(JSON.stringify({ success: false, error: 'Incomplete input data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const transportEmissions = calculateTransportEmissions(transport);
    const energyEmissions = calculateEnergyEmissions(energy);
    const dietEmissions = calculateDietEmissions(diet);
    const otherEmissions = 0;
    const totalEmissions = transportEmissions + energyEmissions + dietEmissions + otherEmissions;

    const { data: carbonEntry, error: insertError } = await supabase
      .from('carbon_data')
      .insert({
        user_id: userId,
        date: new Date().toISOString().split('T')[0],
        category: 'mixed',
        activity: 'Carbon footprint calculation',
        amount: totalEmissions,
        details: { transport, energy, diet, breakdown: { transport: transportEmissions, energy: energyEmissions, diet: dietEmissions, other: otherEmissions } },
        inserted_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (insertError) throw insertError;

    // Award points (optional, handle failure gracefully)
    try {
      await supabase.from('point_transactions').insert({
        user_id: userId,
        points: 50,
        action_type: 'carbon_entry',
        description: 'Calculated carbon footprint',
        carbon_entry_id: carbonEntry.id,
      });

      const { data: currentUser } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', userId)
        .single();

      if (currentUser) {
        await supabase
          .from('profiles')
          .update({ points: (currentUser.points || 0) + 50 })
          .eq('id', userId);
      }
    } catch (pointsError) {
      console.warn('Failed to award points:', pointsError.message);
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          entryId: carbonEntry.id,
          totalEmissions: Math.round(totalEmissions * 100) / 100,
          breakdown: {
            transport: Math.round(transportEmissions * 100) / 100,
            energy: Math.round(energyEmissions * 100) / 100,
            diet: Math.round(dietEmissions * 100) / 100,
            other: Math.round(otherEmissions * 100) / 100,
          },
          timestamp: new Date().toISOString(),
          pointsEarned: 50,
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Carbon calculation error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Internal server error', details: error.toString() }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});