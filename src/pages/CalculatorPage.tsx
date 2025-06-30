import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react'; // Keeping only necessary icons
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { TransportInput, EnergyInput, DietInput, CarbonData } from '../types';
import { supabase } from '../lib/supabase';
import { Save, PlusCircle, ArrowRight } from 'lucide-react';

const CalculatorPage: React.FC = () => {
  const { addCarbonData, user, updateUserPoints } = useApp(); // Added updateUserPoints
  const navigate = useNavigate();
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
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showImplementationMsg, setShowImplementationMsg] = useState(false); // For implementation button

  // Calculate offset data
  const totalOffsetAmount = user?.offsetHistory?.reduce((sum, offset) => sum + offset.amount, 0) || 0;
  const offsetPercentage = calculationResult?.totalEmissions > 0 ? (totalOffsetAmount / calculationResult.totalEmissions) * 100 : 0;

  const handleTabChange = (tab: 'transport' | 'energy' | 'diet') => {
    setActiveTab(tab);
  };

  const handleCalculate = async () => {
    if (!user) {
      alert('Please log in to calculate your carbon footprint.');
      return;
    }

    setIsCalculating(true);

    try {
      if (!transportInput.type || !transportInput.distance || !transportInput.frequency) {
        throw new Error("Transport inputs are incomplete");
      }
      if (!energyInput.type || !energyInput.amount || !energyInput.period) {
        throw new Error("Energy inputs are incomplete");
      }
      if (!dietInput.meatConsumption || !dietInput.dairyConsumption) {
        throw new Error("Diet inputs are incomplete");
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("User not authenticated");

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) throw new Error("Supabase URL not configured in .env");

      const response = await fetch(`${supabaseUrl}/functions/v1/estimateCarbon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          transport: transportInput,
          energy: energyInput,
          diet: dietInput
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`HTTP error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Edge function response:', result);

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Invalid response from carbon calculator');
      }

      setCalculationResult(result.data);
      setShowResults(true);

      if (result.data.entryId) {
        const carbonData: CarbonData = {
          id: result.data.entryId,
          date: new Date().toISOString().split('T')[0],
          category: 'mixed',
          activity: 'Carbon footprint calculation',
          amount: result.data.totalEmissions,
          details: {
            transport: transportInput,
            energy: energyInput,
            diet: dietInput,
            breakdown: result.data.breakdown,
          },
        };
        addCarbonData(carbonData);
        // Attempt to update points immediately
        if (user.id && result.data.pointsEarned) {
          await updateUserPoints(user.id, result.data.pointsEarned);
        }
      }
    } catch (error) {
      console.error('Error calculating carbon footprint:', error);
      alert(`Error calculating your footprint: ${error.message}. Please try again or check the console for details.`);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSaveResults = () => {
    if (calculationResult) {
      alert(`Your carbon footprint data has been saved! You earned ${calculationResult.pointsEarned || 50} Green Points!`);
      navigate('/dashboard');
    }
  };

  const handleAddMore = () => {
    setShowResults(false);
    setCalculationResult(null);
    setActiveTab('transport');
    setTransportInput({
      type: 'car',
      distance: 20,
      frequency: 'daily',
      passengers: 1,
      fuelType: 'gasoline'
    });
    setEnergyInput({
      type: 'electricity',
      amount: 300,
      unit: 'kWh',
      renewable: false,
      period: 'monthly'
    });
    setDietInput({
      meatConsumption: 'medium',
      dairyConsumption: 'medium',
      localFoodPercentage: 20,
      wastePercentage: 15
    });
  };

  const handleImplementAction = () => {
    setShowImplementationMsg(true);
    // Simulate points addition for implementation (adjust logic as needed)
    if (user.id) {
      updateUserPoints(user.id, 85); // Example: 85 points for reducing red meat
    }
    setTimeout(() => setShowImplementationMsg(false), 5000); // Hide after 5 seconds
  };

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <div className="bg-primary-light/10 rounded-xl p-6 inline-block">
          <img src="/logo.png" alt="Logo" className="h-16" /> {/* Replace with your logo path */}
        </div>
        <p className="text-gray-600 mt-2">Track your carbon footprint and take action to reduce it!</p>
      </motion.div>

      {!showResults ? (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex border-b mb-6">
            <TabButton
              active={activeTab === 'transport'}
              onClick={() => handleTabChange('transport')}
              icon={<Info size={18} />}
              label="Transport"
            />
            <TabButton
              active={activeTab === 'energy'}
              onClick={() => handleTabChange('energy')}
              icon={<Info size={18} />}
              label="Energy"
            />
            <TabButton
              active={activeTab === 'diet'}
              onClick={() => handleTabChange('diet')}
              icon={<Info size={18} />}
              label="Diet"
            />
          </div>

          <div className="py-4">
            {activeTab === 'transport' && <TransportForm input={transportInput} setInput={setTransportInput} />}
            {activeTab === 'energy' && <EnergyForm input={energyInput} setInput={setEnergyInput} />}
            {activeTab === 'diet' && <DietForm input={dietInput} setInput={setDietInput} />}
          </div>

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
                disabled={isCalculating || !user}
                className={`btn btn-primary ${isCalculating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isCalculating ? 'Calculating...' : 'Calculate Footprint'}
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
            <p className="text-gray-600 mb-6">Based on the information you provided, here's your estimated carbon footprint:</p>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <p className="text-5xl font-bold text-primary mb-2">
                {calculationResult?.totalEmissions} <span className="text-2xl">kg CO₂e</span>
              </p>
              <p className="text-gray-500">per month</p>
              <div className="flex justify-center items-center mt-4">
                <Info size={18} className="text-gray-500 mr-2" />
                <span className="text-gray-500">
                  {offsetPercentage > 0 ? `${offsetPercentage.toFixed(1)}% offset` : '0% offset'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <Info className="w-6 h-6 text-blue-500 mb-2 mx-auto" />
                <p className="font-medium">Transport</p>
                <p className="text-gray-600 text-sm">{calculationResult?.breakdown.transport} kg CO₂e</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <Info className="w-6 h-6 text-orange-500 mb-2 mx-auto" />
                <p className="font-medium">Energy</p>
                <p className="text-gray-600 text-sm">{calculationResult?.breakdown.energy} kg CO₂e</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <Info className="w-6 h-6 text-green-500 mb-2 mx-auto" />
                <p className="font-medium">Diet</p>
                <p className="text-gray-600 text-sm">{calculationResult?.breakdown.diet} kg CO₂e</p>
              </div>
            </div>

            {calculationResult?.pointsEarned && (
              <div className="bg-primary-light/10 rounded-lg p-4 mb-6">
                <p className="text-primary font-medium">🎉 You earned {calculationResult.pointsEarned} Green Points for tracking your footprint!</p>
              </div>
            )}

            <button
              onClick={handleImplementAction}
              className="btn btn-primary mt-4"
            >
              Implement Action
            </button>

            {showImplementationMsg && (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mt-4 text-center">
                Great choice! You've decided to implement: "Reduce red meat consumption". This could save you approximately 85 kg CO₂e per month. We'll track your progress and award you Green Points for taking action!
              </div>
            )}

            <div className="bg-primary-light/10 rounded-lg p-4 mb-6 flex items-start mt-4">
              <Info className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-left">
                The average carbon footprint is approximately 500 kg CO₂e per month.
                Your footprint is {calculationResult?.totalEmissions < 500 ? 'below' : 'above'} average.
                Visit the dashboard for personalized recommendations on how to reduce your impact.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button onClick={handleSaveResults} className="btn btn-primary">
              <Save size={16} className="mr-2" /> Continue to Dashboard
            </button>
            <button onClick={handleAddMore} className="btn btn-outline">
              <PlusCircle size={16} className="mr-2" /> Calculate Again
            </button>
          </div>
        </motion.div>
      )}

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
            Your data is securely stored, and you'll earn Green Points for tracking your footprint!
          </p>
        </div>
      )}
    </div>
  );
};

// TabButton component
const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    className={`flex items-center px-4 py-2 ${active ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

// TransportForm component
const TransportForm: React.FC<{ input: TransportInput; setInput: (input: TransportInput) => void }> = ({ input, setInput }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Transport Type</label>
        <select
          value={input.type}
          onChange={(e) => setInput({ ...input, type: e.target.value })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
          <option value="car">Car</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="plane">Plane</option>
          <option value="bike">Bike</option>
          <option value="walk">Walk</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Distance (km)</label>
        <input
          type="number"
          value={input.distance}
          onChange={(e) => setInput({ ...input, distance: parseFloat(e.target.value) || 0 })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          min="0"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Frequency</label>
        <select
          value={input.frequency}
          onChange={(e) => setInput({ ...input, frequency: e.target.value })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="once">Once</option>
        </select>
      </div>
      {input.type === 'car' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
            <select
              value={input.fuelType || 'gasoline'}
              onChange={(e) => setInput({ ...input, fuelType: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Passengers</label>
            <input
              type="number"
              value={input.passengers || 1}
              onChange={(e) => setInput({ ...input, passengers: parseInt(e.target.value) || 1 })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              min="1"
            />
          </div>
        </>
      )}
    </div>
  );
};

// EnergyForm component
const EnergyForm: React.FC<{ input: EnergyInput; setInput: (input: EnergyInput) => void }> = ({ input, setInput }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Energy Type</label>
        <select
          value={input.type}
          onChange={(e) => setInput({ ...input, type: e.target.value })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
          <option value="electricity">Electricity</option>
          <option value="heating">Heating</option>
          <option value="cooling">Cooling</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          value={input.amount}
          onChange={(e) => setInput({ ...input, amount: parseFloat(e.target.value) || 0 })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          min="0"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Unit</label>
        <select
          value={input.unit}
          onChange={(e) => setInput({ ...input, unit: e.target.value })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
          <option value="kWh">kWh</option>
        </select>
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={input.renewable}
            onChange={(e) => setInput({ ...input, renewable: e.target.checked })}
            className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700">Renewable Source</span>
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Period</label>
        <select
          value={input.period}
          onChange={(e) => setInput({ ...input, period: e.target.value })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>
  );
};

// DietForm component
const DietForm: React.FC<{ input: DietInput; setInput: (input: DietInput) => void }> = ({ input, setInput }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Meat Consumption</label>
        <select
          value={input.meatConsumption}
          onChange={(e) => setInput({ ...input, meatConsumption: e.target.value })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="none">None</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Dairy Consumption</label>
        <select
          value={input.dairyConsumption}
          onChange={(e) => setInput({ ...input, dairyConsumption: e.target.value })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="none">None</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Local Food Percentage (%)</label>
        <input
          type="number"
          value={input.localFoodPercentage}
          onChange={(e) => setInput({ ...input, localFoodPercentage: parseFloat(e.target.value) || 0 })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          min="0"
          max="100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Waste Percentage (%)</label>
        <input
          type="number"
          value={input.wastePercentage}
          onChange={(e) => setInput({ ...input, wastePercentage: parseFloat(e.target.value) || 0 })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          min="0"
          max="100"
        />
      </div>
    </div>
  );
};

export default CalculatorPage;