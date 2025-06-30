import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Info } from 'lucide-react';

const CalculatorPage: React.FC = () => {
  const { carbonData, totalFootprint, user } = useApp();
  const [transport, setTransport] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(0);
  const [diet, setDiet] = useState<number>(0);
  const [other, setOther] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [calculatedFootprint, setCalculatedFootprint] = useState<number>(0);

  // Calculate total offset amount from user's offset history
  const totalOffsetAmount = user?.offsetHistory?.reduce((sum, offset) => sum + offset.amount, 0) || 0;
  const offsetPercentage = totalFootprint > 0 ? (totalOffsetAmount / totalFootprint) * 100 : 0;

  // Handle form submission
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const total = transport + energy + diet + other;
    setCalculatedFootprint(total);
    setShowResults(true);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Carbon Footprint Calculator</h1>
        <p className="text-gray-600">Enter your monthly usage to calculate your carbon footprint.</p>
      </motion.div>

      {/* Calculator Form */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleCalculate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transport (km)</label>
            <input
              type="number"
              value={transport}
              onChange={(e) => setTransport(Number(e.target.value))}
              className="w-full p-2 border rounded"
              placeholder="e.g., 200"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Energy (kWh)</label>
            <input
              type="number"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full p-2 border rounded"
              placeholder="e.g., 300"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diet (meals)</label>
            <input
              type="number"
              value={diet}
              onChange={(e) => setDiet(Number(e.target.value))}
              className="w-full p-2 border rounded"
              placeholder="e.g., 60"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other (misc)</label>
            <input
              type="number"
              value={other}
              onChange={(e) => setOther(Number(e.target.value))}
              className="w-full p-2 border rounded"
              placeholder="e.g., 50"
              min="0"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Calculate
          </button>
        </form>
      </div>

      {/* Results Section */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-medium">Total Carbon Footprint</p>
              <p className="text-2xl font-bold">{calculatedFootprint.toFixed(1)} kg CO₂e</p>
            </div>
            <div className="flex justify-center items-center mt-2">
              <Info size={18} className="text-gray-500 mr-1" />
              <span className="text-gray-500">
                {isNaN(offsetPercentage) ? '0%' : `${offsetPercentage.toFixed(1)}%`} offset
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CalculatorPage;