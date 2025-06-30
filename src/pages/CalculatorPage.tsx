import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Info, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CarbonNeutralBadge from '../components/ui/CarbonNeutralBadge';

const CalculatorPage: React.FC = () => {
  const { totalFootprint, totalOffsetAmount, addFootprint } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    transport: 0,
    energy: 0,
    diet: 0,
    waste: 0,
  });
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const calculateTotal = () => {
    const total = Object.values(formData).reduce((sum, value) => sum + value, 0);
    addFootprint(total);
    setShowResults(true);
  };

  const offsetPercentage = totalFootprint > 0 ? (totalOffsetAmount / totalFootprint) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Carbon Footprint Calculator</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Estimate your carbon footprint based on your lifestyle choices. Enter your monthly usage in kilograms of CO₂e.
        </p>

        {/* Calculator Form */}
        <div className="space-y-6">
          <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Transport (kg CO₂e)</label>
              <input
                type="number"
                name="transport"
                value={formData.transport}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., 50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Energy (kg CO₂e)</label>
              <input
                type="number"
                name="energy"
                value={formData.energy}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., 30"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Diet (kg CO₂e)</label>
              <input
                type="number"
                name="diet"
                value={formData.diet}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., 20"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Waste (kg CO₂e)</label>
              <input
                type="number"
                name="waste"
                value={formData.waste}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., 10"
              />
            </div>
            <button
              onClick={calculateTotal}
              className="w-full btn btn-primary py-2 mt-4"
            >
              Calculate
            </button>
          </div>

          {/* Results */}
          {showResults && totalFootprint > 0 && (
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md mt-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Your Results</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-700">Total Carbon Emissions</span>
                  <span className="text-sm sm:text-base font-medium text-gray-900">{totalFootprint.toFixed(2)} kg CO₂e</span>
                </div>
                {totalOffsetAmount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-700">Offset Amount</span>
                    <span className="text-sm sm:text-base font-medium text-gray-900">{totalOffsetAmount.toFixed(2)} kg CO₂e</span>
                  </div>
                )}
                <div className="flex justify-center items-center mt-2">
                  <Info size={18} className="text-gray-500 mr-1" />
                  {offsetPercentage > 0 ? (
                    <>
                      <span className="text-gray-500">{offsetPercentage.toFixed(0)}% offset</span>
                      {offsetPercentage >= 100 && (
                        <CheckCircle2 size={18} className="text-green-500 ml-2" />
                      )}
                    </>
                  ) : (
                    <span className="text-gray-500">0% offset</span>
                  )}
                </div>
                {offsetPercentage > 0 && offsetPercentage < 100 && (
                  <CarbonNeutralBadge
                    isNeutral={false}
                    offsetPercentage={offsetPercentage}
                    size="sm"
                    showText={true}
                  />
                )}
                {offsetPercentage >= 100 && (
                  <CarbonNeutralBadge
                    isNeutral={true}
                    offsetPercentage={100}
                    size="sm"
                    showText={true}
                  />
                )}
                <button
                  onClick={() => navigate('/offset')}
                  className="w-full btn btn-primary mt-4 py-2"
                >
                  Offset Your Footprint
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CalculatorPage;