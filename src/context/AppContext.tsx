import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockCommunityData } from '../data/mockData';
import { User, CarbonData, CommunityPost } from '../types';
import { supabase } from '../lib/supabase';
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
  updateUserPoints: (userId: string, points: number) => Promise<void>;
  updateFootprint: (newFootprint: number) => void; // Added updateFootprint
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

  const updateUserPoints = async (userId: string, points: number) => {
    try {
      console.log('Updating points for user:', userId, 'Points to add:', points);
      
      const { data: currentProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', userId)
        .single();

      if (fetchError) {
        console.error('Error fetching current profile:', fetchError);
        throw fetchError;
      }

      const newTotal = (currentProfile.points || 0) + points;
      console.log('Current points:', currentProfile.points, 'New total:', newTotal);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ points: newTotal })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating points:', updateError);
        throw updateError;
      }

      const { error: transactionError } = await supabase
        .from('point_transactions')
        .insert({
          user_id: userId,
          points: points,
          action_type: 'suggestion_implementation',
          description: 'Implemented AI suggestion'
        });

      if (transactionError) {
        console.warn('Transaction creation failed:', transactionError);
      }

      // Update local user state
      console.log('Updating local user state with new points:', newTotal);
      setUser(prev => prev ? { ...prev, greenPoints: newTotal } : null);
      
      // Update streak
      const today = new Date().toDateString();
      const lastActivity = localStorage.getItem(`lastActivity_${userId}`);
      
      if (lastActivity !== today) {
        const currentStreak = user?.streak || 0;
        const newStreak = currentStreak + 1;
        console.log('Updating streak from', currentStreak, 'to', newStreak);
        
        const { error: streakError } = await supabase
          .from('profiles')
          .update({ streak: newStreak })
          .eq('id', userId);
        
        if (!streakError) {
          setUser(prev => prev ? { ...prev, streak: newStreak } : null);
          localStorage.setItem(`lastActivity_${userId}`, today);
          console.log('Streak updated successfully');
          console.error('Error updating streak:', streakError);
        }
      }
      
      console.log('Points update completed successfully');
    } catch (error) {
      console.error('Error in updateUserPoints:', error);
      throw error;
    }
  };

  const updateFootprint = (newFootprint: number) => {
    setTotalFootprint(newFootprint); // Directly update totalFootprint
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear all state
      setUser(null);
      setIsLoggedIn(false);
      setCarbonData([]);
      setCommunityPosts(mockCommunityData);
      setTotalFootprint(0);
      
      // Clear any stored tokens
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.clear();
      
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if there's an error
      setUser(null);
      setIsLoggedIn(false);
      setCarbonData([]);
      setCommunityPosts(mockCommunityData);
      setTotalFootprint(0);
      localStorage.clear();
      sessionStorage.clear();
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
        updateUserPoints,
        updateFootprint, // Added to the provider value
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