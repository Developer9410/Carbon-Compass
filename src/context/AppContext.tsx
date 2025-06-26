import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockCommunityData } from '../data/mockData';
import { User, CarbonData, CommunityPost } from '../types';
import { supabase } from '../lib/supabase'; // Adjust path based on your project structure
import { User as SupabaseUser } from '@supabase/supabase-js';

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
  logout: () => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [carbonData, setCarbonData] = useState<CarbonData[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(mockCommunityData);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [totalFootprint, setTotalFootprint] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session check:', session ? 'Session found' : 'No session');
        if (session?.user) {
          await fetchUserProfileAndData(session.user);
        } else {
          setUser(null);
          setIsLoggedIn(false);
          console.log('No active session, setting isLoggedIn to false');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed - Event:', event, 'Session:', session);
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('User signed in, fetching profile for ID:', session.user.id);
        await fetchUserProfileAndData(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsLoggedIn(false);
        setCarbonData([]);
        setTotalFootprint(0);
        console.log('User signed out, resetting state');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfileAndData = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('Fetching profile for user ID:', supabaseUser.id);
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .maybeSingle();

      if (profileError) {
        console.error('Profile fetch error:', profileError.message);
        return;
      }

      if (userProfile) {
        const appUser: User = {
          id: userProfile.id,
          name: userProfile.name || supabaseUser.email?.split('@')[0] || 'User',
          email: supabaseUser.email || userProfile.email,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${supabaseUser.email}`,
          location: userProfile.location || 'San Francisco, CA',
          joinDate: new Date(supabaseUser.created_at).toLocaleDateString(),
          greenPoints: userProfile.points || 0,
          carbonHistory: userProfile.carbonHistory || [],
          offsetHistory: userProfile.offsetHistory || [],
          challenges: userProfile.challenges || [],
          streak: userProfile.streak || 0,
          level: Math.floor((userProfile.points || 0) / 500) + 1,
          badges: userProfile.badges || [],
        };

        setUser(appUser);
        setIsLoggedIn(true);
        console.log('User set in context, isLoggedIn set to true:', appUser);
      } else {
        console.log('No profile found for user ID:', supabaseUser.id);
        // Create minimal user if profile is missing
        const minimalUser: User = {
          id: supabaseUser.id,
          name: supabaseUser.email?.split('@')[0] || 'User',
          email: supabaseUser.email || '',
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${supabaseUser.email}`,
          location: 'San Francisco, CA',
          joinDate: new Date(supabaseUser.created_at).toLocaleDateString(),
          greenPoints: 0,
          carbonHistory: [],
          offsetHistory: [],
          challenges: [],
          streak: 0,
          level: 1,
          badges: [],
        };
        setUser(minimalUser);
        setIsLoggedIn(true);
        console.log('Minimal user set, isLoggedIn set to true:', minimalUser);
      }

      const { data: carbonDataFromDb, error: carbonError } = await supabase
        .from('carbon_data')
        .select('id, date, category, activity, amount, details, inserted_at')
        .eq('user_id', supabaseUser.id);

      if (carbonError) {
        console.error('Carbon data fetch error:', carbonError.message);
        return;
      }

      if (carbonDataFromDb) {
        const formattedCarbonData: CarbonData[] = carbonDataFromDb.map((item) => ({
          id: item.id,
          date: item.date,
          category: item.category,
          activity: item.activity || 'Carbon footprint calculation',
          amount: item.amount,
          details: item.details || {},
        }));

        setCarbonData(formattedCarbonData);
      }
    } catch (error) {
      console.error('Error in fetchUserProfileAndData:', error);
    }
  };

  useEffect(() => {
    const total = carbonData.reduce((sum, item) => sum + item.amount, 0);
    setTotalFootprint(total);
  }, [carbonData]);

  const addCarbonData = (data: CarbonData) => {
    if (!data.id) {
      console.error('No ID provided for carbon data');
      return;
    }
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

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setIsLoggedIn(false);
      setCarbonData([]);
      setCommunityPosts(mockCommunityData);
      setTotalFootprint(0);
      localStorage.removeItem('supabase.auth.token');
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
      setIsLoggedIn(false);
      throw error;
    }
  };

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
        logout,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};