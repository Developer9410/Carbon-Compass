import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
<<<<<<< HEAD
import { mockCommunityData } from '../data/mockData';
import { User, CarbonData, CommunityPost } from '../types';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
=======
import { mockUserData, mockCommunityData } from '../data/mockData';
import { User, CarbonData, CommunityPost } from '../types';
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  carbonData: CarbonData[];
  setCarbonData: React.Dispatch<React.SetStateAction<CarbonData[]>>;
  communityPosts: CommunityPost[];
  setCommunityPosts: React.Dispatch<React.SetStateAction<CommunityPost[]>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  totalFootprint: number;
  addCarbonData: (data: CarbonData) => void;
  addCommunityPost: (post: CommunityPost) => void;
  toggleLike: (postId: string) => void;
<<<<<<< HEAD
  logout: () => Promise<void>;
  loading: boolean;
=======
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [carbonData, setCarbonData] = useState<CarbonData[]>([]);
<<<<<<< HEAD
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(mockCommunityData);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [totalFootprint, setTotalFootprint] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await fetchUserProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsLoggedIn(false);
        setCarbonData([]);
        setTotalFootprint(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (userProfile) {
        // Transform database user to app user format
        const appUser: User = {
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.email,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.email}`,
          location: userProfile.location || 'San Francisco, CA',
          joinDate: new Date(userProfile.created_at).toLocaleDateString(),
          greenPoints: userProfile.points || 0,
          carbonHistory: userProfile.carbonHistory || [],
          offsetHistory: userProfile.offsetHistory || [],
          challenges: userProfile.challenges || [],
          streak: userProfile.streak || 0,
          level: Math.floor((userProfile.points || 0) / 500) + 1,
          badges: userProfile.badges || [],

        };

        setUser(appUser);
        setCarbonData(appUser.carbonHistory || []);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };
=======
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [totalFootprint, setTotalFootprint] = useState<number>(0);

  // Initialize with mock data on login
  useEffect(() => {
    if (isLoggedIn && !user) {
      setUser(mockUserData);
      setCarbonData(mockUserData.carbonHistory || []);
      setCommunityPosts(mockCommunityData);
    }
  }, [isLoggedIn, user]);
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd

  // Calculate total carbon footprint
  useEffect(() => {
    const total = carbonData.reduce((sum, item) => sum + item.amount, 0);
    setTotalFootprint(total);
  }, [carbonData]);

  const addCarbonData = (data: CarbonData) => {
    setCarbonData((prev) => [...prev, data]);
  };

  const addCommunityPost = (post: CommunityPost) => {
    setCommunityPosts((prev) => [post, ...prev]);
  };

  const toggleLike = (postId: string) => {
    if (!user) return;
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const hasLiked = post.likedBy.includes(user.id);
          return {
            ...post,
            likes: hasLiked ? post.likes - 1 : post.likes + 1,
            likedBy: hasLiked
              ? post.likedBy.filter((id) => id !== user.id)
              : [...post.likedBy, user.id],
          };
        }
        return post;
      })
    );
  };

<<<<<<< HEAD
  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
      
      // Clear local state
      setUser(null);
      setIsLoggedIn(false);
      setCarbonData([]);
      setCommunityPosts(mockCommunityData);
      setTotalFootprint(0);
      
      // Clear any stored data
      localStorage.removeItem('supabase.auth.token');
      
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, ensure the user is logged out locally
      setUser(null);
      setIsLoggedIn(false);
      throw error;
    }
  };

=======
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        carbonData,
        setCarbonData,
        communityPosts,
        setCommunityPosts,
        isLoggedIn,
        setIsLoggedIn,
        totalFootprint,
        addCarbonData,
        addCommunityPost,
        toggleLike,
<<<<<<< HEAD
        logout,
        loading,
=======
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
<<<<<<< HEAD
};
=======
};
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
