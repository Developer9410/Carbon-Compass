import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, Star, ShoppingCart, Heart, Leaf, Award, 
  Filter, Search, Check, ExternalLink, Zap, TreePine
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Reward {
  id: string;
  name: string;
  description: string;
  category: 'discount' | 'donation' | 'product' | 'service' | 'offset';
  pointsCost: number;
  imageUrl: string;
  partner: string;
  active: boolean;
}

const mockRewards: Reward[] = [
  {
    id: '1',
    name: '$10 Patagonia Discount',
    description: 'Get $10 off your next Patagonia purchase of sustainable outdoor gear',
    category: 'discount',
    pointsCost: 500,
    imageUrl: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=500',
    partner: 'Patagonia',
    active: true
  },
  {
    id: '2',
    name: 'Tree Planting Donation',
    description: 'Plant 5 trees through our reforestation partner',
    category: 'donation',
    pointsCost: 250,
    imageUrl: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=500',
    partner: 'One Tree Planted',
    active: true
  },
  {
    id: '3',
    name: 'Bamboo Toothbrush Set',
    description: 'Eco-friendly bamboo toothbrush 4-pack with biodegradable bristles',
    category: 'product',
    pointsCost: 300,
    imageUrl: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=500',
    partner: 'EcoLife',
    active: true
  },
  {
    id: '4',
    name: 'Solar Panel Consultation',
    description: 'Free consultation for home solar panel installation',
    category: 'service',
    pointsCost: 1000,
    imageUrl: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=500',
    partner: 'SolarCity',
    active: true
  },
  {
    id: '5',
    name: 'Ocean Cleanup Donation',
    description: 'Support ocean plastic cleanup efforts',
    category: 'donation',
    pointsCost: 400,
    imageUrl: 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?auto=compress&cs=tinysrgb&w=500',
    partner: 'Ocean Cleanup',
    active: true
  },
  {
    id: '6',
    name: 'Reusable Water Bottle',
    description: 'Premium stainless steel water bottle with temperature control',
    category: 'product',
    pointsCost: 200,
    imageUrl: 'https://images.pexels.com/photos/3737631/pexels-photo-3737631.jpeg?auto=compress&cs=tinysrgb&w=500',
    partner: 'Hydro Flask',
    active: true
  },
  {
    id: '7',
    name: 'Carbon Offset Credits',
    description: 'Offset 100kg of CO2 through verified projects',
    category: 'offset',
    pointsCost: 150,
    imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=500',
    partner: 'Carbon Trust',
    active: true
  },
  {
    id: '8',
    name: 'Organic Meal Kit',
    description: 'One week of organic, locally-sourced meal kits',
    category: 'product',
    pointsCost: 600,
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
    partner: 'Green Chef',
    active: true
  },
  {
    id: '9',
    name: 'Electric Bike Rental',
    description: '3-day electric bike rental for eco-friendly transportation',
    category: 'service',
    pointsCost: 800,
    imageUrl: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=500',
    partner: 'Lime',
    active: true
  },
  {
    id: '10',
    name: 'Wildlife Conservation',
    description: 'Support endangered species protection programs',
    category: 'donation',
    pointsCost: 350,
    imageUrl: 'https://images.pexels.com/photos/3551227/pexels-photo-3551227.jpeg?auto=compress&cs=tinysrgb&w=500',
    partner: 'WWF',
    active: true
  }
];

const RewardsPage: React.FC = () => {
  const { user } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'discount' | 'donation' | 'product' | 'service' | 'offset'>('all');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showRedemption, setShowRedemption] = useState(false);
  const [redemptionHistory, setRedemptionHistory] = useState<any[]>([]);

  // Filter rewards based on search and category
  const filteredRewards = mockRewards.filter(reward => {
    const matchesSearch = 
      reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.partner.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || reward.category === activeFilter;
    
    return matchesSearch && matchesFilter && reward.active;
  });

  const handleRedeemReward = (reward: Reward) => {
    if (!user || user.greenPoints < reward.pointsCost) {
      alert('Insufficient Green Points!');
      return;
    }

    // Simulate redemption
    const redemption = {
      id: Date.now().toString(),
      reward,
      pointsSpent: reward.pointsCost,
      redemptionCode: `CC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toLocaleDateString(),
      status: 'confirmed'
    };

    setRedemptionHistory(prev => [redemption, ...prev]);
    setSelectedReward(reward);
    setShowRedemption(true);

    // In a real app, this would update the user's points in the database
    alert(`Successfully redeemed ${reward.name}! Your redemption code is: ${redemption.redemptionCode}`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'discount': return <ShoppingCart size={16} />;
      case 'donation': return <Heart size={16} />;
      case 'product': return <Gift size={16} />;
      case 'service': return <Zap size={16} />;
      case 'offset': return <TreePine size={16} />;
      default: return <Gift size={16} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'discount': return 'bg-blue-100 text-blue-800';
      case 'donation': return 'bg-green-100 text-green-800';
      case 'product': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-orange-100 text-orange-800';
      case 'offset': return 'bg-emerald-100 text-emerald-800';
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
        <h1 className="text-3xl font-bold mb-2">Green Rewards</h1>
        <p className="text-gray-600">
          Redeem your Green Points for eco-friendly rewards and make a positive impact.
        </p>
      </motion.div>

      {/* Points Balance */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mr-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800">
                {user?.greenPoints || 0} Green Points
              </h2>
              <p className="text-green-700">Available for redemption</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-green-600 mb-1">Next milestone: 2,000 points</p>
            <div className="w-48 bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${Math.min(100, ((user?.greenPoints || 0) / 2000) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rewards..."
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <div className="flex items-center">
            <Filter size={16} className="mr-2 text-gray-500 hidden md:block" />
            <span className="text-sm text-gray-600 mr-3 hidden md:block">Filter:</span>
            <div className="flex space-x-2">
              <FilterButton 
                active={activeFilter === 'all'} 
                onClick={() => setActiveFilter('all')}
                label="All"
              />
              <FilterButton 
                active={activeFilter === 'discount'} 
                onClick={() => setActiveFilter('discount')}
                label="Discounts"
              />
              <FilterButton 
                active={activeFilter === 'donation'} 
                onClick={() => setActiveFilter('donation')}
                label="Donations"
              />
              <FilterButton 
                active={activeFilter === 'product'} 
                onClick={() => setActiveFilter('product')}
                label="Products"
              />
              <FilterButton 
                active={activeFilter === 'service'} 
                onClick={() => setActiveFilter('service')}
                label="Services"
              />
              <FilterButton 
                active={activeFilter === 'offset'} 
                onClick={() => setActiveFilter('offset')}
                label="Offsets"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredRewards.map((reward) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <img 
              src={reward.imageUrl} 
              alt={reward.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-xs px-2 py-1 rounded-full flex items-center ${getCategoryColor(reward.category)}`}>
                  {getCategoryIcon(reward.category)}
                  <span className="ml-1 capitalize">{reward.category}</span>
                </span>
                <span className="text-xs text-gray-500">by {reward.partner}</span>
              </div>
              
              <h3 className="font-semibold mb-2">{reward.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{reward.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-bold text-primary">{reward.pointsCost} points</span>
                </div>
                
                <button
                  onClick={() => handleRedeemReward(reward)}
                  disabled={!user || user.greenPoints < reward.pointsCost}
                  className={`btn btn-sm ${
                    user && user.greenPoints >= reward.pointsCost
                      ? 'btn-primary'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {user && user.greenPoints >= reward.pointsCost ? 'Redeem' : 'Insufficient Points'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Redemption History */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Redemption History</h2>
        
        {redemptionHistory.length > 0 ? (
          <div className="space-y-4">
            {redemptionHistory.map((redemption) => (
              <div key={redemption.id} className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Check className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">{redemption.reward.name}</h3>
                    <p className="text-sm text-gray-600">
                      {redemption.pointsSpent} points • {redemption.date}
                    </p>
                    <p className="text-xs text-gray-500">Code: {redemption.redemptionCode}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-2">
                    {redemption.status}
                  </span>
                  <ExternalLink size={16} className="text-gray-400 hover:text-primary cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Gift className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No redemptions yet</h3>
            <p className="text-gray-500">
              Start earning Green Points and redeem them for amazing eco-friendly rewards!
            </p>
          </div>
        )}
      </div>

      {/* How to Earn Points */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">How to Earn Green Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium text-blue-800">Track Footprint</h4>
            <p className="text-sm text-blue-700">+50 points per entry</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium text-blue-800">Complete Challenges</h4>
            <p className="text-sm text-blue-700">+100-300 points</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <TreePine className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium text-blue-800">Offset Carbon</h4>
            <p className="text-sm text-blue-700">+200 points per offset</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium text-blue-800">Share Progress</h4>
            <p className="text-sm text-blue-700">+25 points per share</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1 rounded-full transition-colors ${
        active 
          ? 'bg-primary text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

export default RewardsPage;