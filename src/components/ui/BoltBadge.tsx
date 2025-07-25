import React from 'react';
import { motion } from 'framer-motion';

interface BoltBadgeProps {
  className?: string;
}

const BoltBadge: React.FC<BoltBadgeProps> = ({ className = '' }) => {
  return (
    <motion.a
      href="https://bolt.new/"
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${className} inline-block flex-shrink-0`} // Added inline-block and flex-shrink-0
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        <img
          src={`${import.meta.env.BASE_URL}black_circle_360x360.png`}
          alt="Built with Bolt.new"
          // Ensured fixed width/height and added flex-shrink-0 for good measure
          className="w-12 h-12 md:w-14 md:h-14 hover:shadow-xl transition-shadow duration-300 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
          }}
        />
        {/* Tooltip content - unchanged but important for context */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap max-w-xs">
            Built with Bolt.new
            <div className="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default BoltBadge;