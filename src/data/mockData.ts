import { User, CarbonData, OffsetData, CommunityPost, Resource, Challenge, AISuggestion } from '../types';
import { format, subDays, subMonths } from 'date-fns';

// Generate dates for the past year
const generatePastDates = (count: number, interval: number = 1) => {
  return Array.from({ length: count }, (_, i) => 
    format(subDays(new Date(), i * interval), 'yyyy-MM-dd')
  );
};

// Mock user data
export const mockUserData: User = {
  id: 'user1',
  name: 'Alex Green',
  email: 'alex@example.com',
  avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  location: 'San Francisco, CA',
  joinDate: '2023-11-15',
  greenPoints: 1250,
  carbonHistory: [
    {
      id: 'carbon1',
      date: format(subDays(new Date(), 0), 'yyyy-MM-dd'),
      category: 'transport',
      activity: 'Car commute',
      amount: 3.2,
    },
    {
      id: 'carbon2',
      date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      category: 'energy',
      activity: 'Home electricity',
      amount: 2.1,
    },
    {
      id: 'carbon3',
      date: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
      category: 'diet',
      activity: 'Meat consumption',
      amount: 1.8,
    },
    {
      id: 'carbon4',
      date: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
      category: 'transport',
      activity: 'Flight',
      amount: 120,
    },
    {
      id: 'carbon5',
      date: format(subDays(new Date(), 4), 'yyyy-MM-dd'),
      category: 'energy',
      activity: 'Heating',
      amount: 4.5,
    },
    {
      id: 'carbon6',
      date: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
      category: 'diet',
      activity: 'Dairy consumption',
      amount: 1.2,
    },
  ],
  offsetHistory: [
    {
      id: 'offset1',
      date: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
      amount: 50,
      cost: 25,
      project: {
        id: 'project1',
        name: 'Amazon Rainforest Reforestation',
        description: 'Planting trees in deforested areas of the Amazon rainforest',
        location: 'Brazil',
        type: 'reforestation',
        imageUrl: 'https://images.pexels.com/photos/5846983/pexels-photo-5846983.jpeg?auto=compress&cs=tinysrgb&w=500',
      },
    },
    {
      id: 'offset2',
      date: format(subMonths(new Date(), 1), 'yyyy-MM-dd'),
      amount: 100,
      cost: 45,
      project: {
        id: 'project2',
        name: 'Wind Farm Development',
        description: 'Supporting wind energy production in rural communities',
        location: 'Iowa, USA',
        type: 'renewable',
        imageUrl: 'https://images.pexels.com/photos/1277882/pexels-photo-1277882.jpeg?auto=compress&cs=tinysrgb&w=500',
      },
    },
  ],
  challenges: [
    {
      id: 'challenge1',
      title: 'Bike to Work Week',
      description: 'Replace car commutes with biking for one week',
      type: 'individual',
      category: 'transport',
      target: 5,
      current: 3,
      startDate: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
      endDate: format(subDays(new Date(), -2), 'yyyy-MM-dd'),
      participants: ['user1'],
      rewards: {
        greenPoints: 100,
        badge: {
          id: 'badge1',
          name: 'Cycling Champion',
          description: 'Completed the Bike to Work Week challenge',
          icon: 'bicycle',
          earnedDate: '',
        },
      },
    },
  ],
  streak: 7,
  level: 3,
  badges: [
    {
      id: 'badge2',
      name: 'Early Adopter',
      description: 'Joined Carbon Compass in its first month',
      icon: 'rocket',
      earnedDate: '2023-11-20',
    },
    {
      id: 'badge3',
      name: 'Carbon Cutter',
      description: 'Reduced carbon footprint by 20%',
      icon: 'scissors',
      earnedDate: '2024-01-15',
    },
  ],
};

// Mock carbon data history
export const mockCarbonDataHistory: CarbonData[] = [
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `hist${i}`,
    date: format(subDays(new Date(), i), 'yyyy-MM-dd'),
    category: ['transport', 'energy', 'diet', 'other'][Math.floor(Math.random() * 4)] as 'transport' | 'energy' | 'diet' | 'other',
    activity: ['Car commute', 'Home electricity', 'Meat consumption', 'Online shopping'][Math.floor(Math.random() * 4)],
    amount: Math.random() * 10 + 1,
  })),
];

// Mock community posts
export const mockCommunityData: CommunityPost[] = [
  {
    id: 'post1',
    userId: 'user2',
    userName: 'Jamie Rivers',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Just completed my first month of carpooling to work! Saved about 85kg of CO2 and made some new friends along the way.',
    date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    likes: 24,
    likedBy: ['user3', 'user4'],
    comments: [
      {
        id: 'comment1',
        userId: 'user3',
        userName: 'Morgan Chen',
        userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        content: 'That\'s awesome! I\'ve been thinking about doing the same thing.',
        date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
        likes: 3,
      },
    ],
    category: 'achievement',
    tags: ['transport', 'carpooling'],
  },
  {
    id: 'post2',
    userId: 'user3',
    userName: 'Morgan Chen',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Has anyone tried the new solar panel subscription service? Looking for reviews before I commit.',
    image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=500',
    date: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
    likes: 7,
    likedBy: ['user1'],
    comments: [],
    category: 'question',
    tags: ['energy', 'solar'],
  },
  {
    id: 'post3',
    userId: 'user4',
    userName: 'Sam Taylor',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Pro tip: I\'ve been using a pressure cooker for meals and it\'s cut my cooking energy use by almost 70%! Plus food cooks faster.',
    date: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
    likes: 42,
    likedBy: ['user1', 'user2', 'user3'],
    comments: [
      {
        id: 'comment2',
        userId: 'user1',
        userName: 'Alex Green',
        userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        content: 'Which model do you recommend?',
        date: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
        likes: 1,
      },
    ],
    category: 'tip',
    tags: ['energy', 'cooking'],
  },
];

// Mock educational resources
export const mockResources: Resource[] = [
  {
    id: 'resource1',
    title: 'Understanding Your Carbon Footprint',
    description: 'A comprehensive guide to understanding what makes up your personal carbon footprint and how to measure it accurately.',
    category: 'article',
    imageUrl: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=500',
    url: '#article-carbon-footprint',
    tags: ['basics', 'education'],
    readTime: 8,
  },
  {
    id: 'resource2',
    title: 'Sustainable Transportation Options',
    description: 'Explore various eco-friendly transportation methods and their impact on reducing your carbon emissions.',
    category: 'video',
    imageUrl: 'https://images.pexels.com/photos/1751279/pexels-photo-1751279.jpeg?auto=compress&cs=tinysrgb&w=500',
    url: '#video-sustainable-transport',
    tags: ['transport', 'lifestyle'],
    readTime: 15,
  },
  {
    id: 'resource3',
    title: 'The Impact of Diet on Climate Change',
    description: 'How your food choices affect your carbon footprint and simple changes that can make a big difference.',
    category: 'infographic',
    imageUrl: 'https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg?auto=compress&cs=tinysrgb&w=500',
    url: '#infographic-diet-impact',
    tags: ['diet', 'food'],
    readTime: 5,
  },
  {
    id: 'resource4',
    title: 'Home Energy Efficiency Guide',
    description: 'Practical tips and investments to reduce energy consumption in your home while saving money.',
    category: 'article',
    imageUrl: 'https://images.pexels.com/photos/3785939/pexels-photo-3785939.jpeg?auto=compress&cs=tinysrgb&w=500',
    url: '#article-home-energy',
    tags: ['energy', 'home'],
    readTime: 12,
  },
];

// Mock challenges
export const mockChallenges: Challenge[] = [
  {
    id: 'challenge2',
    title: 'Meatless Monday Challenge',
    description: 'Skip meat every Monday for a month to reduce your dietary carbon footprint',
    type: 'individual',
    category: 'diet',
    target: 4,
    current: 0,
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(subDays(new Date(), -28), 'yyyy-MM-dd'),
    participants: [],
    rewards: {
      greenPoints: 150,
    },
  },
  {
    id: 'challenge3',
    title: 'Neighborhood Energy Saver',
    description: 'Compete with your neighbors to reduce household energy consumption',
    type: 'group',
    category: 'energy',
    target: 20,
    current: 5,
    startDate: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
    endDate: format(subDays(new Date(), -20), 'yyyy-MM-dd'),
    participants: ['user1', 'user2', 'user3', 'user4', 'user5'],
    rewards: {
      greenPoints: 300,
      badge: {
        id: 'badge4',
        name: 'Energy Saver',
        description: 'Reduced household energy consumption by 20%',
        icon: 'zap',
        earnedDate: '',
      },
    },
  },
  {
    id: 'challenge4',
    title: 'Zero Waste Week',
    description: 'Minimize waste production for one week through reduction, reuse, and recycling',
    type: 'individual',
    category: 'other',
    target: 7,
    current: 0,
    startDate: format(subDays(new Date(), -7), 'yyyy-MM-dd'),
    endDate: format(subDays(new Date(), -14), 'yyyy-MM-dd'),
    participants: [],
    rewards: {
      greenPoints: 200,
    },
  },
];

// Mock AI suggestions
export const mockAISuggestions: AISuggestion[] = [
  {
    id: 'suggestion1',
    category: 'transport',
    title: 'Switch to public transit twice a week',
    description: 'Based on your commuting patterns, you could reduce your carbon footprint by 42kg CO2e monthly by taking the bus on Tuesdays and Thursdays.',
    impact: 'medium',
    estimatedReduction: 42,
    difficulty: 'medium',
  },
  {
    id: 'suggestion2',
    category: 'energy',
    title: 'Install a smart thermostat',
    description: 'Your home heating patterns suggest you could save up to 15% on energy by installing a smart thermostat that optimizes temperature based on occupancy.',
    impact: 'high',
    estimatedReduction: 120,
    difficulty: 'medium',
  },
  {
    id: 'suggestion3',
    category: 'diet',
    title: 'Reduce red meat consumption',
    description: 'Your diet currently includes red meat 3-4 times weekly. Reducing to once a week could lower your food carbon footprint by 30%.',
    impact: 'high',
    estimatedReduction: 85,
    difficulty: 'medium',
  },
  {
    id: 'suggestion4',
    category: 'other',
    title: 'Switch to paperless billing',
    description: 'Opt for digital statements and bills to reduce paper waste and associated emissions.',
    impact: 'low',
    estimatedReduction: 5,
    difficulty: 'easy',
  },
];

// Generate chart data for the dashboard
export const generateChartData = () => {
  const dates = generatePastDates(30, 1);
  
  // Daily data
  const dailyData = dates.map((date, index) => ({
    date,
    transport: Math.random() * 5 + 1,
    energy: Math.random() * 3 + 0.5,
    diet: Math.random() * 2 + 0.3,
    other: Math.random() * 1 + 0.1,
  }));
  
  // Weekly data (average of daily)
  const weeklyData = [];
  for (let i = 0; i < 4; i++) {
    const weekStart = i * 7;
    const weekSlice = dailyData.slice(weekStart, weekStart + 7);
    const weekAvg = {
      date: `Week ${i+1}`,
      transport: weekSlice.reduce((sum, day) => sum + day.transport, 0) / 7,
      energy: weekSlice.reduce((sum, day) => sum + day.energy, 0) / 7,
      diet: weekSlice.reduce((sum, day) => sum + day.diet, 0) / 7,
      other: weekSlice.reduce((sum, day) => sum + day.other, 0) / 7,
    };
    weeklyData.push(weekAvg);
  }
  
  // Monthly data (sum of daily)
  const monthlyData = [
    {
      date: 'This Month',
      transport: dailyData.reduce((sum, day) => sum + day.transport, 0),
      energy: dailyData.reduce((sum, day) => sum + day.energy, 0),
      diet: dailyData.reduce((sum, day) => sum + day.diet, 0),
      other: dailyData.reduce((sum, day) => sum + day.other, 0),
    }
  ];
  
  return { dailyData, weeklyData, monthlyData };
};

// Generate leaderboard data
export const mockLeaderboard = [
  { id: 'user5', name: 'Jordan Lee', avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150', points: 3240, reductionPercent: 32 },
  { id: 'user6', name: 'Riley Johnson', avatarUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150', points: 2850, reductionPercent: 28 },
  { id: 'user1', name: 'Alex Green', avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', points: 1250, reductionPercent: 15 },
  { id: 'user7', name: 'Casey Wilson', avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', points: 1100, reductionPercent: 11 },
  { id: 'user3', name: 'Morgan Chen', avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', points: 980, reductionPercent: 9 },
];

// Generate carbon offset projects
export const mockOffsetProjects = [
  {
    id: 'project2',
    name: 'Wind Farm Development',
    description: 'Supporting the construction of wind turbines to replace fossil fuel electricity generation in rural communities.',
    location: 'Iowa, USA',
    type: 'renewable',
    imageUrl: 'https://images.pexels.com/photos/1277882/pexels-photo-1277882.jpeg?auto=compress&cs=tinysrgb&w=500',
    pricePerTon: 18,
    rating: 4.6,
    capacity: '50 MW',
    homesServiced: 30000,
    carbonDisplaced: 12000,
  },
  {
    id: 'project3',
    name: 'Methane Capture from Landfills',
    description: 'Converting harmful methane emissions from landfills into usable energy, preventing potent greenhouse gases from entering the atmosphere.',
    location: 'California, USA',
    type: 'methane',
    imageUrl: 'https://images.pexels.com/photos/4239036/pexels-photo-4239036.jpeg?auto=compress&cs=tinysrgb&w=500',
    pricePerTon: 12,
    rating: 4.3,
    landfillSize: 'Large municipal',
    energyProduced: '10 MWh daily',
    carbonPrevented: 8000,
  },
  {
    id: 'project4',
    name: 'Mangrove Restoration',
    description: 'Restoring mangrove ecosystems that serve as crucial carbon sinks while protecting coastal communities from storms and erosion.',
    location: 'Indonesia',
    type: 'reforestation',
    imageUrl: 'https://images.pexels.com/photos/11842810/pexels-photo-11842810.jpeg?auto=compress&cs=tinysrgb&w=500',
    pricePerTon: 20,
    rating: 4.9,
    coastlineProtected: '25 km',
    mangrovesPlanted: 100000,
    carbonSequestered: 3500,
  },
  {
    id: 'project5',
    name: 'Solar Energy Initiative',
    description: 'Supporting solar panel installations in rural communities to provide clean energy and reduce dependence on fossil fuels.',
    location: 'Arizona, USA',
    type: 'renewable',
    imageUrl: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=500',
    pricePerTon: 16,
    rating: 4.7,
    capacity: '75 MW',
    homesServiced: 45000,
    carbonDisplaced: 15000,
  },
];