import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Home, Utensils, Recycle, Lightbulb, Droplets, Leaf, Star } from 'lucide-react';

const SustainabilityTipsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const tips = [
    {
      id: 1,
      category: 'transport',
      title: 'Walk, Bike, or Use Public Transit',
      description: 'Replace short car trips with walking, biking, or public transportation to significantly reduce your carbon footprint.',
      impact: 'High',
      difficulty: 'Easy',
      savings: '2.6 tons CO₂/year',
      icon: <Car className="w-6 h-6" />
    },
    {
      id: 2,
      category: 'energy',
      title: 'Switch to LED Light Bulbs',
      description: 'LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs.',
      impact: 'Medium',
      difficulty: 'Easy',
      savings: '0.5 tons CO₂/year',
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      id: 3,
      category: 'diet',
      title: 'Reduce Meat Consumption',
      description: 'Eating less meat, especially beef, can dramatically reduce your dietary carbon footprint.',
      impact: 'High',
      difficulty: 'Medium',
      savings: '1.8 tons CO₂/year',
      icon: <Utensils className="w-6 h-6" />
    },
    {
      id: 4,
      category: 'energy',
      title: 'Unplug Electronics When Not in Use',
      description: 'Many devices consume energy even when turned off. Unplugging them can save energy and money.',
      impact: 'Low',
      difficulty: 'Easy',
      savings: '0.2 tons CO₂/year',
      icon: <Home className="w-6 h-6" />
    },
    {
      id: 5,
      category: 'waste',
      title: 'Reduce, Reuse, Recycle',
      description: 'Follow the 3 Rs hierarchy: reduce consumption first, reuse items when possible, then recycle.',
      impact: 'Medium',
      difficulty: 'Easy',
      savings: '0.8 tons CO₂/year',
      icon: <Recycle className="w-6 h-6" />
    },
    {
      id: 6,
      category: 'energy',
      title: 'Use a Programmable Thermostat',
      description: 'Automatically adjust your home temperature to save energy when you\'re away or sleeping.',
      impact: 'High',
      difficulty: 'Medium',
      savings: '1.2 tons CO₂/year',
      icon: <Home className="w-6 h-6" />
    },
    {
      id: 7,
      category: 'water',
      title: 'Take Shorter Showers',
      description: 'Reducing shower time by just 2 minutes can save significant water and energy.',
      impact: 'Medium',
      difficulty: 'Easy',
      savings: '0.4 tons CO₂/year',
      icon: <Droplets className="w-6 h-6" />
    },
    {
      id: 8,
      category: 'diet',
      title: 'Buy Local and Seasonal Food',
      description: 'Choose locally grown, seasonal produce to reduce transportation emissions and support local farmers.',
      impact: 'Medium',
      difficulty: 'Easy',
      savings: '0.6 tons CO₂/year',
      icon: <Leaf className="w-6 h-6" />
    },
    {
      id: 9,
      category: 'transport',
      title: 'Combine Errands into One Trip',
      description: 'Plan your errands efficiently to reduce the number of car trips you need to make.',
      impact: 'Medium',
      difficulty: 'Easy',
      savings: '0.7 tons CO₂/year',
      icon: <Car className="w-6 h-6" />
    },
    {
      id: 10,
      category: 'energy',
      title: 'Air Dry Your Clothes',
      description: 'Skip the dryer when possible and hang clothes to dry naturally, saving energy and extending fabric life.',
      impact: 'Medium',
      difficulty: 'Easy',
      savings: '0.9 tons CO₂/year',
      icon: <Home className="w-6 h-6" />
    },
    {
      id: 11,
      category: 'waste',
      title: 'Use Reusable Bags and Containers',
      description: 'Replace single-use plastic bags and containers with reusable alternatives.',
      impact: 'Low',
      difficulty: 'Easy',
      savings: '0.3 tons CO₂/year',
      icon: <Recycle className="w-6 h-6" />
    },
    {
      id: 12,
      category: 'water',
      title: 'Fix Water Leaks Promptly',
      description: 'A single dripping faucet can waste thousands of gallons of water per year.',
      impact: 'Low',
      difficulty: 'Medium',
      savings: '0.2 tons CO₂/year',
      icon: <Droplets className="w-6 h-6" />
    }
  ];

  const categories = [
    { id: 'all', label: 'All Tips', icon: <Star className="w-4 h-4" /> },
    { id: 'transport', label: 'Transport', icon: <Car className="w-4 h-4" /> },
    { id: 'energy', label: 'Energy', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'diet', label: 'Diet', icon: <Utensils className="w-4 h-4" /> },
    { id: 'waste', label: 'Waste', icon: <Recycle className="w-4 h-4" /> },
    { id: 'water', label: 'Water', icon: <Droplets className="w-4 h-4" /> }
  ];

  const filteredTips = activeCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === activeCategory);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Sustainability Tips</h1>
        <p className="text-gray-600">
          Practical, actionable tips to reduce your environmental impact and live more sustainably.
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredTips.map((tip, index) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center text-primary mr-4">
                {tip.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{tip.title}</h3>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm">{tip.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(tip.impact)}`}>
                {tip.impact} Impact
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(tip.difficulty)}`}>
                {tip.difficulty}
              </span>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm font-medium text-green-800">Potential Savings</p>
              <p className="text-lg font-bold text-green-600">{tip.savings}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Start Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Quick Start Guide</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Start Small</h3>
            <p className="text-sm text-gray-600">
              Pick 2-3 easy tips that fit your lifestyle and start implementing them today.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">Track Progress</h3>
            <p className="text-sm text-gray-600">
              Use our carbon calculator to monitor your footprint reduction over time.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">Expand & Share</h3>
            <p className="text-sm text-gray-600">
              Gradually add more tips and share your journey with friends and family.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Impact Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm p-8"
      >
        <h2 className="text-2xl font-bold mb-6">Your Potential Impact</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="text-3xl font-bold text-green-600">12.4</h3>
            <p className="text-sm text-green-700">tons CO₂ saved/year</p>
            <p className="text-xs text-gray-600 mt-1">if you implement all tips</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h3 className="text-3xl font-bold text-blue-600">$2,400</h3>
            <p className="text-sm text-blue-700">potential savings/year</p>
            <p className="text-xs text-gray-600 mt-1">from reduced energy & fuel costs</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <h3 className="text-3xl font-bold text-purple-600">31</h3>
            <p className="text-sm text-purple-700">trees equivalent</p>
            <p className="text-xs text-gray-600 mt-1">carbon absorption per year</p>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <h3 className="text-3xl font-bold text-orange-600">27,000</h3>
            <p className="text-sm text-orange-700">miles not driven</p>
            <p className="text-xs text-gray-600 mt-1">equivalent impact</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SustainabilityTipsPage;