import React, { useState } from 'react';
<<<<<<< HEAD
import { supabase } from '../lib/supabase';
=======
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
import { motion } from 'framer-motion';
import { Car, Home, Utensils, Package, ArrowRight, Info, Save, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TransportInput, EnergyInput, DietInput, CarbonData } from '../types';
import { v4 as uuidv4 } from 'uuid';

<<<<<<< HEAD
const CalculatorPage: React.FC = () => {
  const { user, addCarbonData } = useApp();
=======
// Demo implementation - in a real app, this would connect to the Carbon Interface API
const calculateCarbonFootprint = (
  transport: TransportInput | null, 
  energy: EnergyInput | null,
  diet: DietInput | null
): number => {
  let total = 0;
  
  if (transport) {
    // Basic calculation based on transport type and distance
    const baseFactors: Record<string, number> = {
      car: 0.2, // kg CO2e per km
      bus: 0.1,
      train: 0.05,
      plane: 0.25,
      bike: 0,
      walk: 0
    };
    
    const frequencyMultipliers: Record<string, number> = {
      daily: 30,
      weekly: 4,
      monthly: 1,
      once: 1
    };
    
    let factor = baseFactors[transport.type];
    
    // Adjust for fuel type if car
    if (transport.type === 'car' && transport.fuelType) {
      const fuelFactors: Record<string, number> = {
        gasoline: 1,
        diesel: 1.1,
        electric: 0.3,
        hybrid: 0.6
      };
      factor *= fuelFactors[transport.fuelType];
    }
    
    // Adjust for passengers if applicable
    if (transport.passengers && transport.passengers > 1) {
      factor /= transport.passengers;
    }
    
    total += factor * transport.distance * frequencyMultipliers[transport.frequency];
  }
  
  if (energy) {
    // Basic calculation for energy
    const baseFactors: Record<string, number> = {
      electricity: 0.4, // kg CO2e per kWh
      heating: 0.2,
      cooling: 0.3
    };
    
    const periodMultipliers: Record<string, number> = {
      daily: 30,
      weekly: 4,
      monthly: 1
    };
    
    let factor = baseFactors[energy.type];
    
    // Adjust for renewable energy
    if (energy.renewable) {
      factor *= 0.2; // 80% reduction for renewable
    }
    
    total += factor * energy.amount * periodMultipliers[energy.period];
  }
  
  if (diet) {
    // Basic calculation for diet
    const meatFactors: Record<string, number> = {
      high: 3.3, // kg CO2e per day
      medium: 2.5,
      low: 1.7,
      none: 1.0
    };
    
    const dairyFactors: Record<string, number> = {
      high: 1.5,
      medium: 1.0,
      low: 0.5,
      none: 0.1
    };
    
    // Base calculation from meat and dairy
    let dietTotal = meatFactors[diet.meatConsumption] + dairyFactors[diet.dairyConsumption];
    
    // Adjust for local food percentage (up to 20% reduction)
    dietTotal *= (1 - (diet.localFoodPercentage * 0.2 / 100));
    
    // Adjust for waste (up to 10% increase)
    dietTotal *= (1 + (diet.wastePercentage * 0.1 / 100));
    
    // Monthly total
    total += dietTotal * 30;
  }
  
  return parseFloat(total.toFixed(2));
};

const CalculatorPage: React.FC = () => {
  const { addCarbonData } = useApp();
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
  const [activeTab, setActiveTab] = useState<'transport' | 'energy' | 'diet'>('transport');
  const [transportInput, setTransportInput] = useState<TransportInput>({
    type: 'car',
    distance: 20,
    frequency: 'daily',
    passengers: 1,
    fuelType: 'gasoline'
  });
  const [energyInput, setEnergyInput] = useState<EnergyInput>({
    type: 'electricity',
    amount: 300,
    unit: 'kWh',
    renewable: false,
    period: 'monthly'
  });
  const [dietInput, setDietInput] = useState<DietInput>({
    meatConsumption: 'medium',
    dairyConsumption: 'medium',
    localFoodPercentage: 20,
    wastePercentage: 15
  });
  
  const [calculatedFootprint, setCalculatedFootprint] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  const handleTabChange = (tab: 'transport' | 'energy' | 'diet') => {
    setActiveTab(tab);
  };
<<<<<<< HEAD

  const handleCalculate = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/estimateCarbon`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    transport: transportInput,
    energy: energyInput,
    diet: dietInput
  })
});

if (!response.ok) {
  throw new Error('Failed to calculate carbon footprint.');
}

// ✅ Add this check before parsing
if (!response.headers.get('Content-Type')?.includes('application/json')) {
  throw new Error('Unexpected response format');
}

const result = await response.json();

if (!result.success || !result.data?.totalEmissions) {
  throw new Error('Invalid response from carbon calculator');
}

setCalculatedFootprint(result.data.totalEmissions);
setShowResults(true);

  } catch (error) {
    console.error('Error fetching carbon footprint:', error);
    alert('Error calculating your footprint. Please try again.');
  }
};

  
  const handleSaveResults = async () => {
  if (!calculatedFootprint || !user) {
    alert('User not logged in or footprint not calculated.');
    return;
  }

  const date = new Date().toISOString().split('T')[0];

  const transportData: CarbonData = {
    id: uuidv4(),
    user_id: user.id,
    date,
    category: 'transport',
    activity: `${transportInput.type} travel`,
    amount: parseFloat((calculatedFootprint * 0.4).toFixed(2)),
    details: transportInput
  };

  const energyData: CarbonData = {
    id: uuidv4(),
    user_id: user.id,
    date,
    category: 'energy',
    activity: `${energyInput.type} usage`,
    amount: parseFloat((calculatedFootprint * 0.35).toFixed(2)),
    details: energyInput
  };

  const dietData: CarbonData = {
    id: uuidv4(),
    user_id: user.id,
    date,
    category: 'diet',
    activity: `Food consumption`,
    amount: parseFloat((calculatedFootprint * 0.25).toFixed(2)),
    details: dietInput
  };

  const { error } = await supabase.from('carbon_data').insert([
    transportData,
    energyData,
    dietData
  ]);

  if (error) {
    console.error('Error saving data to Supabase:', error);
    alert('Failed to save data. Please try again.');
    return;
  }

  // Update UI context and show success
  addCarbonData(transportData);
  addCarbonData(energyData);
  addCarbonData(dietData);

  setShowResults(false);
  setCalculatedFootprint(null);
  alert('Your carbon footprint data has been saved!');
};
=======
  
  const handleCalculate = () => {
    const footprint = calculateCarbonFootprint(transportInput, energyInput, dietInput);
    setCalculatedFootprint(footprint);
    setShowResults(true);
  };
  
  const handleSaveResults = () => {
    if (calculatedFootprint) {
      // Transport data
      const transportData: CarbonData = {
        id: uuidv4(),
        date: new Date().toISOString().split('T')[0],
        category: 'transport',
        activity: `${transportInput.type} travel`,
        amount: calculatedFootprint * 0.4, // Approximate transport portion
        details: transportInput
      };
      
      // Energy data
      const energyData: CarbonData = {
        id: uuidv4(),
        date: new Date().toISOString().split('T')[0],
        category: 'energy',
        activity: `${energyInput.type} usage`,
        amount: calculatedFootprint * 0.35, // Approximate energy portion
        details: energyInput
      };
      
      // Diet data
      const dietData: CarbonData = {
        id: uuidv4(),
        date: new Date().toISOString().split('T')[0],
        category: 'diet',
        activity: `Food consumption`,
        amount: calculatedFootprint * 0.25, // Approximate diet portion
        details: dietInput
      };
      
      // Add all data
      addCarbonData(transportData);
      addCarbonData(energyData);
      addCarbonData(dietData);
      
      // Reset form and show confirmation
      setShowResults(false);
      setCalculatedFootprint(null);
      alert('Your carbon footprint data has been saved!');
    }
  };
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
  
  const handleAddMore = () => {
    setShowResults(false);
    setCalculatedFootprint(null);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Carbon Footprint Calculator</h1>
        <p className="text-gray-600">
          Calculate your carbon footprint by providing information about your lifestyle and habits.
        </p>
      </motion.div>
      
      {!showResults ? (
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            <TabButton 
              active={activeTab === 'transport'}
              onClick={() => handleTabChange('transport')}
              icon={<Car size={18} />}
              label="Transport"
            />
            <TabButton 
              active={activeTab === 'energy'}
              onClick={() => handleTabChange('energy')}
              icon={<Home size={18} />}
              label="Energy"
            />
            <TabButton 
              active={activeTab === 'diet'}
              onClick={() => handleTabChange('diet')}
              icon={<Utensils size={18} />}
              label="Diet"
            />
          </div>
          
          {/* Form content based on active tab */}
          <div className="py-4">
            {activeTab === 'transport' && (
              <TransportForm input={transportInput} setInput={setTransportInput} />
            )}
            
            {activeTab === 'energy' && (
              <EnergyForm input={energyInput} setInput={setEnergyInput} />
            )}
            
            {activeTab === 'diet' && (
              <DietForm input={dietInput} setInput={setDietInput} />
            )}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => {
                if (activeTab === 'energy') handleTabChange('transport');
                else if (activeTab === 'diet') handleTabChange('energy');
              }}
              className={`btn btn-outline ${activeTab === 'transport' ? 'invisible' : ''}`}
            >
              Previous
            </button>
            
            {activeTab !== 'diet' ? (
              <button
                onClick={() => {
                  if (activeTab === 'transport') handleTabChange('energy');
                  else if (activeTab === 'energy') handleTabChange('diet');
                }}
                className="btn btn-primary"
              >
                Next <ArrowRight size={16} className="ml-1" />
              </button>
            ) : (
              <button
                onClick={handleCalculate}
                className="btn btn-primary"
              >
                Calculate Footprint
              </button>
            )}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Your Carbon Footprint</h2>
            <p className="text-gray-600 mb-6">
              Based on the information you provided, here's your estimated carbon footprint:
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <p className="text-5xl font-bold text-primary mb-2">
                {calculatedFootprint} <span className="text-2xl">kg CO₂e</span>
              </p>
              <p className="text-gray-500">per month</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <Car className="w-6 h-6 text-blue-500 mb-2 mx-auto" />
                <p className="font-medium">Transport</p>
                <p className="text-gray-600 text-sm">~{(calculatedFootprint! * 0.4).toFixed(1)} kg CO₂e</p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <Home className="w-6 h-6 text-orange-500 mb-2 mx-auto" />
                <p className="font-medium">Energy</p>
                <p className="text-gray-600 text-sm">~{(calculatedFootprint! * 0.35).toFixed(1)} kg CO₂e</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <Utensils className="w-6 h-6 text-green-500 mb-2 mx-auto" />
                <p className="font-medium">Diet</p>
                <p className="text-gray-600 text-sm">~{(calculatedFootprint! * 0.25).toFixed(1)} kg CO₂e</p>
              </div>
            </div>
            
            <div className="bg-primary-light/10 rounded-lg p-4 mb-6 flex items-start">
              <Info className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-left">
                The average carbon footprint is approximately 500 kg CO₂e per month. 
                Your footprint is {calculatedFootprint! < 500 ? 'below' : 'above'} average. 
                Visit the dashboard for personalized recommendations on how to reduce your impact.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleSaveResults}
              className="btn btn-primary"
            >
              <Save size={16} className="mr-2" /> Save Results
            </button>
            
            <button
              onClick={handleAddMore}
              className="btn btn-outline"
            >
              <PlusCircle size={16} className="mr-2" /> Add More Data
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Additional information */}
      {!showResults && (
        <div className="mt-8 bg-primary-light/10 rounded-xl p-6">
          <h3 className="font-semibold mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2" /> About Carbon Footprint Calculation
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            This calculator provides an estimate of your carbon footprint based on your lifestyle choices. 
            For the most accurate results, please provide detailed information in all sections.
          </p>
          <p className="text-sm text-gray-700">
            The results are calculated using industry-standard emission factors and methodologies.
            In a full implementation, this would connect to the Carbon Interface API for precise calculations.
          </p>
        </div>
      )}
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-3 border-b-2 font-medium transition-colors ${
        active 
          ? 'border-primary text-primary' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
};

interface TransportFormProps {
  input: TransportInput;
  setInput: React.Dispatch<React.SetStateAction<TransportInput>>;
}

const TransportForm: React.FC<TransportFormProps> = ({ input, setInput }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Transport Type
        </label>
        <select
          value={input.type}
          onChange={(e) => setInput({ ...input, type: e.target.value as any })}
          className="input w-full"
        >
          <option value="car">Car</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="plane">Plane</option>
          <option value="bike">Bicycle</option>
          <option value="walk">Walking</option>
        </select>
      </div>
      
      {input.type === 'car' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fuel Type
          </label>
          <select
            value={input.fuelType}
            onChange={(e) => setInput({ ...input, fuelType: e.target.value as any })}
            className="input w-full"
          >
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Distance (km)
        </label>
        <input
          type="number"
          value={input.distance}
          onChange={(e) => setInput({ ...input, distance: parseFloat(e.target.value) })}
          min="0"
          className="input w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Frequency
        </label>
        <select
          value={input.frequency}
          onChange={(e) => setInput({ ...input, frequency: e.target.value as any })}
          className="input w-full"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="once">One time</option>
        </select>
      </div>
      
      {(input.type === 'car' || input.type === 'bus') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Passengers (including you)
          </label>
          <input
            type="number"
            value={input.passengers}
            onChange={(e) => setInput({ ...input, passengers: parseInt(e.target.value) })}
            min="1"
            className="input w-full"
          />
        </div>
      )}
    </div>
  );
};

interface EnergyFormProps {
  input: EnergyInput;
  setInput: React.Dispatch<React.SetStateAction<EnergyInput>>;
}

const EnergyForm: React.FC<EnergyFormProps> = ({ input, setInput }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Energy Type
        </label>
        <select
          value={input.type}
          onChange={(e) => setInput({ ...input, type: e.target.value as any })}
          className="input w-full"
        >
          <option value="electricity">Electricity</option>
          <option value="heating">Heating</option>
          <option value="cooling">Cooling</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <div className="flex">
          <input
            type="number"
            value={input.amount}
            onChange={(e) => setInput({ ...input, amount: parseFloat(e.target.value) })}
            min="0"
            className="input rounded-r-none w-full"
          />
          <select
            value={input.unit}
            onChange={(e) => setInput({ ...input, unit: e.target.value as any })}
            className="input rounded-l-none border-l-0"
          >
            <option value="kWh">kWh</option>
            <option value="therm">therm</option>
            <option value="MJ">MJ</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time Period
        </label>
        <select
          value={input.period}
          onChange={(e) => setInput({ ...input, period: e.target.value as any })}
          className="input w-full"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="renewable"
          checked={input.renewable}
          onChange={(e) => setInput({ ...input, renewable: e.target.checked })}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label htmlFor="renewable" className="ml-2 block text-sm text-gray-700">
          I use renewable energy sources
        </label>
      </div>
    </div>
  );
};

interface DietFormProps {
  input: DietInput;
  setInput: React.Dispatch<React.SetStateAction<DietInput>>;
}

const DietForm: React.FC<DietFormProps> = ({ input, setInput }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meat Consumption
        </label>
        <select
          value={input.meatConsumption}
          onChange={(e) => setInput({ ...input, meatConsumption: e.target.value as any })}
          className="input w-full"
        >
          <option value="high">High (daily)</option>
          <option value="medium">Medium (3-5 times a week)</option>
          <option value="low">Low (once a week or less)</option>
          <option value="none">None (vegetarian/vegan)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dairy Consumption
        </label>
        <select
          value={input.dairyConsumption}
          onChange={(e) => setInput({ ...input, dairyConsumption: e.target.value as any })}
          className="input w-full"
        >
          <option value="high">High (daily, multiple servings)</option>
          <option value="medium">Medium (daily, moderate)</option>
          <option value="low">Low (occasionally)</option>
          <option value="none">None (vegan)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Local Food Percentage (%)
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={input.localFoodPercentage}
          onChange={(e) => setInput({ ...input, localFoodPercentage: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0% (All imported)</span>
          <span>{input.localFoodPercentage}%</span>
          <span>100% (All local)</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Food Waste Percentage (%)
        </label>
        <input
          type="range"
          min="0"
          max="50"
          step="5"
          value={input.wastePercentage}
          onChange={(e) => setInput({ ...input, wastePercentage: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0% (No waste)</span>
          <span>{input.wastePercentage}%</span>
          <span>50% (High waste)</span>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;