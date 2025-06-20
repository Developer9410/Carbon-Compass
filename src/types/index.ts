// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  location: string;
  joinDate: string;
  greenPoints: number;
  carbonHistory: CarbonData[];
  offsetHistory: OffsetData[];
  challenges: Challenge[];
  streak: number;
  level: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
}

// Carbon calculation related types
export interface CarbonData {
  id: string;
  date: string;
  category: 'transport' | 'energy' | 'diet' | 'other';
  activity: string;
  amount: number; // in kg CO2e
  details?: Record<string, any>;
}

export interface TransportInput {
  type: 'car' | 'bus' | 'train' | 'plane' | 'bike' | 'walk';
  distance: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'once';
  passengers?: number;
  fuelType?: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
}

export interface EnergyInput {
  type: 'electricity' | 'heating' | 'cooling';
  amount: number;
  unit: 'kWh' | 'therm' | 'MJ';
  renewable: boolean;
  period: 'daily' | 'weekly' | 'monthly';
}

export interface DietInput {
  meatConsumption: 'high' | 'medium' | 'low' | 'none';
  dairyConsumption: 'high' | 'medium' | 'low' | 'none';
  localFoodPercentage: number;
  wastePercentage: number;
}

// Offset related types
export interface OffsetData {
  id: string;
  date: string;
  amount: number; // in kg CO2e
  cost: number;
  project: {
    id: string;
    name: string;
    description: string;
    location: string;
    type: 'reforestation' | 'renewable' | 'methane' | 'other';
    imageUrl: string;
  };
}

// Community related types
export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  date: string;
  likes: number;
  likedBy: string[];
  comments: Comment[];
  category: 'achievement' | 'tip' | 'question' | 'general';
  tags: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  date: string;
  likes: number;
}

// Challenge related types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'group';
  category: 'transport' | 'energy' | 'diet' | 'other';
  target: number;
  current: number;
  startDate: string;
  endDate: string;
  participants: string[];
  rewards: {
    greenPoints: number;
    badge?: Badge;
  };
}

export interface GroupChallenge extends Challenge {
  groupId: string;
  groupName: string;
  creatorId: string;
}

// Educational content types
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'article' | 'video' | 'infographic' | 'tool';
  imageUrl: string;
  url: string;
  tags: string[];
  readTime?: number;
}

// AI suggestion types
export interface AISuggestion {
  id: string;
  category: 'transport' | 'energy' | 'diet' | 'other';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  estimatedReduction: number;
  difficulty: 'easy' | 'medium' | 'hard';
}