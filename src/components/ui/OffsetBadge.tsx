import React from 'react';
import { Check, Award, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

interface OffsetBadgeProps {
  totalOffset: number;
  totalFootprint: number;
  className?: string;
}

const OffsetBadge: React.FC<OffsetBadgeProps> = ({ totalOffset, totalFootprint, className = '' }) => {
  const isNeutral = totalOffset >= totalFootprint;
  const percentage = Math.min(100, (totalOffset / totalFootprint) * 100);
  
  return (
    <motion.div 
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {isNeutral ? (
        <>
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
            <Check size={12} className="text-white" />
          </div>
          <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
            Carbon Neutral
          </span>
        </>
      ) : (
        <>
          <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center mr-2 relative">
            <div 
              className="absolute inset-0 bg-green-500 rounded-full"
              style={{ 
                clipPath: `polygon(0 ${100 - percentage}%, 100% ${100 - percentage}%, 100% 100%, 0% 100%)` 
              }}
            />
            <Leaf size={12} className="text-white relative z-10" />
          </div>
          <span className="text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
            {percentage.toFixed(0)}% Offset
          </span>
        </>
      )}
    </motion.div>
  );
};

export default OffsetBadge;