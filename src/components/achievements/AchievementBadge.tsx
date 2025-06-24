import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Leaf, Calculator, Users, Target, Zap, Heart } from 'lucide-react';

interface Achievement {
  id: string;
  type: string;
  name: string;
  description: string;
  pointsAwarded: number;
  badgeIcon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  animated?: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ 
  achievement, 
  size = 'md', 
  showDetails = true,
  animated = true 
}) => {
  const getIcon = (iconName: string) => {
    const iconMap = {
      calculator: Calculator,
      leaf: Leaf,
      award: Award,
      star: Star,
      users: Users,
      target: Target,
      zap: Zap,
      heart: Heart,
    };
    
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Award;
    return <IconComponent className="w-full h-full" />;
  };

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return {
          bg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
          border: 'border-yellow-400',
          glow: 'shadow-yellow-400/50',
          text: 'text-yellow-800'
        };
      case 'epic':
        return {
          bg: 'bg-gradient-to-br from-purple-400 to-pink-500',
          border: 'border-purple-400',
          glow: 'shadow-purple-400/50',
          text: 'text-purple-800'
        };
      case 'rare':
        return {
          bg: 'bg-gradient-to-br from-blue-400 to-cyan-500',
          border: 'border-blue-400',
          glow: 'shadow-blue-400/50',
          text: 'text-blue-800'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-400 to-gray-500',
          border: 'border-gray-400',
          glow: 'shadow-gray-400/50',
          text: 'text-gray-800'
        };
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return {
          container: 'w-12 h-12',
          icon: 'w-6 h-6',
          text: 'text-xs'
        };
      case 'lg':
        return {
          container: 'w-20 h-20',
          icon: 'w-10 h-10',
          text: 'text-base'
        };
      default:
        return {
          container: 'w-16 h-16',
          icon: 'w-8 h-8',
          text: 'text-sm'
        };
    }
  };

  const colors = getRarityColors(achievement.rarity);
  const sizes = getSizeClasses(size);

  const badgeVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`
          ${sizes.container} ${colors.bg} ${colors.border} 
          border-2 rounded-full flex items-center justify-center
          shadow-lg ${colors.glow} relative overflow-hidden
        `}
        variants={animated ? badgeVariants : undefined}
        initial={animated ? "initial" : undefined}
        animate={animated ? "animate" : undefined}
        whileHover={animated ? "hover" : undefined}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-full" />
        
        {/* Icon */}
        <div className={`${sizes.icon} text-white relative z-10`}>
          {getIcon(achievement.badgeIcon)}
        </div>

        {/* Rarity indicator */}
        {achievement.rarity !== 'common' && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <Star className="w-2 h-2 text-yellow-500 fill-current" />
          </div>
        )}
      </motion.div>

      {showDetails && (
        <div className="mt-2 text-center max-w-32">
          <h4 className={`font-semibold ${sizes.text} ${colors.text}`}>
            {achievement.name}
          </h4>
          {size !== 'sm' && (
            <>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {achievement.description}
              </p>
              <div className="flex items-center justify-center mt-1 text-xs text-gray-500">
                <Award className="w-3 h-3 mr-1" />
                <span>{achievement.pointsAwarded} pts</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;