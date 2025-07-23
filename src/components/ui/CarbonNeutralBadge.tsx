import React from 'react';
import { Award, Leaf, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CarbonNeutralBadgeProps {
  isNeutral: boolean;
  offsetPercentage: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const CarbonNeutralBadge: React.FC<CarbonNeutralBadgeProps> = ({ 
  isNeutral, 
  offsetPercentage, 
  size = 'md',
  showText = true 
}) => {
  // Don't render anything if there's no meaningful offset data
  if (!isNeutral && offsetPercentage <= 0) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 24
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  if (isNeutral) {
    return (
      <motion.div 
        className="flex items-center flex-shrink-0"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg`}>
          <Award size={iconSizes[size]} className="text-white" />
        </div>
        {showText && (
          <span className={`ml-2 font-semibold text-green-700 ${textSizes[size]} whitespace-nowrap`}>
            Carbon Neutral
          </span>
        )}
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="flex items-center flex-shrink-0"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className={`${sizeClasses[size]} relative`}>
        {/* Background circle */}
        <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
        
        {/* Progress circle */}
        <svg className={`${sizeClasses[size]} transform -rotate-90`} viewBox="0 0 36 36">
          <path
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-green-500"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={`${offsetPercentage}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Leaf size={iconSizes[size] * 0.6} className="text-green-600" />
        </div>
      </div>
      
      {showText && (
        <span className={`ml-2 font-medium text-gray-700 ${textSizes[size]} whitespace-nowrap`}>
          {offsetPercentage.toFixed(0)}% Offset
        </span>
      )}
    </motion.div>
  );
};

export default CarbonNeutralBadge;