import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, Calendar, Trophy, ArrowRight, User, CheckCircle, Clock, ChevronsUp } from 'lucide-react';
import { mockChallenges } from '../data/mockData';
import { useApp } from '../context/AppContext';

const ChallengesPage: React.FC = () => {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'individual' | 'group'>('all');
  const [showChallengeForm, setShowChallengeForm] = useState(false);
  
  // Filter challenges based on active tab
  const filteredChallenges = activeTab === 'all' 
    ? mockChallenges 
    : mockChallenges.filter(challenge => challenge.type === activeTab);
  
  // Get user's active challenges
  const userChallenges = user?.challenges || [];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };
  
  // Handle join challenge (demo only)
  const handleJoinChallenge = (challengeId: string) => {
    alert("Challenge joined! (This is a demo - in a real app, you would be added to the challenge)");
  };

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Challenges</h1>
            <p className="text-gray-600">
              Join challenges to reduce your carbon footprint and earn rewards.
            </p>
          </div>
          
          <button
            onClick={() => setShowChallengeForm(true)}
            className="btn btn-primary flex items-center"
          >
            <Plus size={16} className="mr-2" /> Create Challenge
          </button>
        </div>
      </motion.div>
      
      {/* My Active Challenges */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">My Active Challenges</h2>
        
        {userChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-xl shadow-sm overflow-hidden border-2 border-primary">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      challenge.type === 'individual' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {challenge.type === 'individual' ? 'Individual' : 'Group'}
                    </span>
                    
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      challenge.category === 'transport' ? 'bg-blue-100 text-blue-800' :
                      challenge.category === 'energy' ? 'bg-orange-100 text-orange-800' :
                      challenge.category === 'diet' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {challenge.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{challenge.current}/{challenge.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${(challenge.current / challenge.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>Ends {challenge.endDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Trophy size={14} className="mr-1" />
                      <span>{challenge.rewards.greenPoints} points</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No active challenges</h3>
            <p className="text-gray-500 mb-4">
              You haven't joined any challenges yet. Explore available challenges below and join one to get started!
            </p>
          </div>
        )}
      </div>
      
      {/* Available Challenges */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Available Challenges</h2>
          
          <div className="flex space-x-2">
            <TabButton 
              active={activeTab === 'all'} 
              onClick={() => setActiveTab('all')}
              label="All"
            />
            <TabButton 
              active={activeTab === 'individual'} 
              onClick={() => setActiveTab('individual')}
              label="Individual"
            />
            <TabButton 
              active={activeTab === 'group'} 
              onClick={() => setActiveTab('group')}
              label="Group"
            />
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredChallenges.map((challenge) => (
            <motion.div 
              key={challenge.id} 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    challenge.type === 'individual' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {challenge.type === 'individual' ? 'Individual' : 'Group'}
                  </span>
                  
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    challenge.category === 'transport' ? 'bg-blue-100 text-blue-800' :
                    challenge.category === 'energy' ? 'bg-orange-100 text-orange-800' :
                    challenge.category === 'diet' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {challenge.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-500 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm font-medium">{challenge.startDate} - {challenge.endDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Trophy size={16} className="text-gray-500 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Reward</p>
                      <p className="text-sm font-medium">{challenge.rewards.greenPoints} points</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {challenge.type === 'group' ? (
                      <Users size={16} className="text-gray-500 mr-2" />
                    ) : (
                      <User size={16} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <p className="text-xs text-gray-500">Participants</p>
                      <p className="text-sm font-medium">{challenge.participants.length} joined</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-500">
                    <ChevronsUp className="text-primary mr-1" size={16} />
                    <span>Target: {challenge.target} {challenge.category === 'transport' ? 'trips' : challenge.category === 'energy' ? '% reduction' : 'days'}</span>
                  </div>
                  
                  <button
                    onClick={() => handleJoinChallenge(challenge.id)}
                    className="btn btn-sm btn-primary"
                  >
                    Join
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Challenge Form Modal (would be implemented fully in a real app) */}
      {showChallengeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Create a New Challenge</h2>
              
              <p className="text-gray-600 mb-6">
                This feature would allow you to create custom challenges for yourself or groups in a full implementation.
              </p>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setShowChallengeForm(false)}
                  className="btn btn-outline mr-2"
                >
                  Cancel
                </button>
                <button className="btn btn-primary">
                  Create Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`text-sm px-3 py-1 rounded-lg ${
        active 
          ? 'bg-primary text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

export default ChallengesPage;