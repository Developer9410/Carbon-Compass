import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Edit, Trash2, CheckCircle, Clock, TrendingDown } from 'lucide-react';

interface Goal {
  id: string;
  type: 'reduction' | 'offset' | 'points' | 'streak';
  targetValue: number;
  targetUnit: string;
  targetDate?: string;
  currentValue: number;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  createdAt: string;
}

const GoalTracker: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      type: 'reduction',
      targetValue: 30,
      targetUnit: 'percent',
      targetDate: '2024-12-31',
      currentValue: 18,
      status: 'active',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      type: 'offset',
      targetValue: 500,
      targetUnit: 'kg CO2e',
      currentValue: 320,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      type: 'streak',
      targetValue: 30,
      targetUnit: 'days',
      currentValue: 12,
      status: 'active',
      createdAt: '2024-02-01'
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'reduction':
        return <TrendingDown className="w-5 h-5 text-green-500" />;
      case 'offset':
        return <Target className="w-5 h-5 text-blue-500" />;
      case 'points':
        return <CheckCircle className="w-5 h-5 text-purple-500" />;
      case 'streak':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Target className="w-5 h-5 text-gray-500" />;
    }
  };

  const getGoalTitle = (goal: Goal) => {
    switch (goal.type) {
      case 'reduction':
        return `Reduce footprint by ${goal.targetValue}%`;
      case 'offset':
        return `Offset ${goal.targetValue} ${goal.targetUnit}`;
      case 'points':
        return `Earn ${goal.targetValue} Green Points`;
      case 'streak':
        return `Maintain ${goal.targetValue} day streak`;
      default:
        return 'Custom Goal';
    }
  };

  const getProgressPercentage = (goal: Goal) => {
    return Math.min(100, (goal.currentValue / goal.targetValue) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysRemaining = (targetDate?: string) => {
    if (!targetDate) return null;
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">My Goals</h3>
          <p className="text-sm text-gray-600">Track your sustainability objectives</p>
        </div>
        
        <button
          onClick={() => setShowAddGoal(true)}
          className="btn btn-primary btn-sm flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Goal
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-8">
          <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium mb-2">No goals set yet</h4>
          <p className="text-gray-500 mb-4">
            Set sustainability goals to track your progress and stay motivated.
          </p>
          <button
            onClick={() => setShowAddGoal(true)}
            className="btn btn-primary"
          >
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = getProgressPercentage(goal);
            const daysRemaining = getDaysRemaining(goal.targetDate);
            
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    {getGoalIcon(goal.type)}
                    <div className="ml-3">
                      <h4 className="font-medium">{getGoalTitle(goal)}</h4>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(goal.status)}`}>
                          {goal.status}
                        </span>
                        {daysRemaining !== null && (
                          <span className="text-xs text-gray-500">
                            {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit size={14} className="text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 size={14} className="text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className="font-medium">
                      {goal.currentValue} / {goal.targetValue} {goal.targetUnit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${
                        progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>{progress.toFixed(1)}% complete</span>
                    <span>{goal.targetValue}</span>
                  </div>
                </div>

                {progress === 100 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-green-800 font-medium">Goal completed! 🎉</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Goal</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Type
                  </label>
                  <select className="input w-full">
                    <option value="reduction">Carbon Footprint Reduction</option>
                    <option value="offset">Carbon Offset</option>
                    <option value="points">Green Points</option>
                    <option value="streak">Daily Streak</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Value
                  </label>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="Enter target value"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Date (Optional)
                  </label>
                  <input
                    type="date"
                    className="input w-full"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Add goal logic here
                    setShowAddGoal(false);
                  }}
                  className="btn btn-primary"
                >
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalTracker;