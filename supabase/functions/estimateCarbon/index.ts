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

// Emission factors (kg CO2e)
const EMISSION_FACTORS = {
  transport: {
    car: { gasoline: 0.2, diesel: 0.22, electric: 0.05, hybrid: 0.12 },
    bus: 0.08,
    train: 0.04,
    plane: 0.25,
    bike: 0,
    walk: 0
  },
  energy: {
    electricity: 0.4, // kg CO2e per kWh
    heating: 0.2,
    cooling: 0.3
  },
  diet: {
    meat: { high: 3.3, medium: 2.5, low: 1.7, none: 1.0 },
    dairy: { high: 1.5, medium: 1.0, low: 0.5, none: 0.1 }
  }
};

const FREQUENCY_MULTIPLIERS = {
  daily: 30,
  weekly: 4,
  monthly: 1,
  once: 1
};

const PERIOD_MULTIPLIERS = {
  daily: 30,
  weekly: 4,
  monthly: 1
};

function calculateTransportEmissions(transport: TransportInput): number {
  const { type, distance, frequency, passengers = 1, fuelType = 'gasoline' } = transport;
  
  let factor = 0;
  if (type === 'car' && EMISSION_FACTORS.transport.car[fuelType as keyof typeof EMISSION_FACTORS.transport.car]) {
    factor = EMISSION_FACTORS.transport.car[fuelType as keyof typeof EMISSION_FACTORS.transport.car];
  } else if (EMISSION_FACTORS.transport[type as keyof typeof EMISSION_FACTORS.transport]) {
    factor = EMISSION_FACTORS.transport[type as keyof typeof EMISSION_FACTORS.transport] as number;
  }
  
  // Adjust for passengers (carpooling reduces per-person emissions)
  if (passengers > 1) {
    factor /= passengers;
  }
  
  const multiplier = FREQUENCY_MULTIPLIERS[frequency as keyof typeof FREQUENCY_MULTIPLIERS] || 1;
  return factor * distance * multiplier;
}

function calculateEnergyEmissions(energy: EnergyInput): number {
  const { type, amount, renewable, period } = energy;
  
  let factor = EMISSION_FACTORS.energy[type as keyof typeof EMISSION_FACTORS.energy] || 0;
  
  // Adjust for renewable energy
  if (renewable) {
    factor *= 0.2; // 80% reduction for renewable
  }
  
  const multiplier = PERIOD_MULTIPLIERS[period as keyof typeof PERIOD_MULTIPLIERS] || 1;
  return factor * amount * multiplier;
}

function calculateDietEmissions(diet: DietInput): number {
  const { meatConsumption, dairyConsumption, localFoodPercentage, wastePercentage } = diet;
  
  const meatFactor = EMISSION_FACTORS.diet.meat[meatConsumption as keyof typeof EMISSION_FACTORS.diet.meat] || 0;
  const dairyFactor = EMISSION_FACTORS.diet.dairy[dairyConsumption as keyof typeof EMISSION_FACTORS.diet.dairy] || 0;
  
  let total = meatFactor + dairyFactor;
  
  // Adjust for local food (up to 20% reduction)
  total *= (1 - (localFoodPercentage * 0.2 / 100));
  
  // Adjust for waste (up to 10% increase)
  total *= (1 + (wastePercentage * 0.1 / 100));
  
  // Monthly total
  return total * 30;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    // Get user from auth header
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const body: RequestBody = await req.json();
    const { transport, energy, diet } = body;

    // Calculate emissions for each category
    const transportEmissions = calculateTransportEmissions(transport);
    const energyEmissions = calculateEnergyEmissions(energy);
    const dietEmissions = calculateDietEmissions(diet);
    const otherEmissions = 0; // Placeholder for other categories

    const totalEmissions = transportEmissions + energyEmissions + dietEmissions + otherEmissions;

    // Store in database
    const { data: entry, error } = await supabase
      .from('carbon_data')
      .insert({
        user_id: 'demo-user', // In real app, extract from JWT
        transport_emissions: transportEmissions,
        energy_emissions: energyEmissions,
        diet_emissions: dietEmissions,
        other_emissions: otherEmissions,
        total_emissions: totalEmissions,
        calculation_data: { transport, energy, diet }
      })
      .select('id, created_at')
      .single();

    if (error) {
      console.error('Database error:', error);
      // Continue without storing for demo purposes
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          totalEmissions,
          breakdown: {
            transport: transportEmissions,
            energy: energyEmissions,
            diet: dietEmissions,
            other: otherEmissions
          },
          entryId: entry?.id,
          timestamp: entry?.created_at || new Date().toISOString()
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Carbon estimation error:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});