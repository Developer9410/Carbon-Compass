import { createClient } from '@supabase/supabase-js';

// Get environment variables with enhanced debugging
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Enhanced debug logging
console.log('Supabase Environment Debug:', {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'Missing',
  key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'Missing',
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  // Show all available environment variables for debugging
  allEnvVars: Object.keys(import.meta.env),
  // Show process.env for comparison
  processEnvKeys: typeof process !== 'undefined' ? Object.keys(process.env || {}) : 'N/A'
});

// For Bolt Hosting, we need to provide a way to configure Supabase
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl ? 'Set' : 'Missing',
    key: supabaseAnonKey ? 'Set' : 'Missing'
  });
  
  // Create a placeholder client that shows helpful messages
  const placeholderClient = {
    auth: {
      signUp: () => Promise.resolve({ 
        data: { user: null, session: null }, 
        error: { message: 'Please configure Supabase by clicking "Connect to Supabase" in the top right corner.' }
      }),
      signInWithPassword: () => Promise.resolve({ 
        data: { user: null, session: null }, 
        error: { message: 'Please configure Supabase by clicking "Connect to Supabase" in the top right corner.' }
      }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }),
      insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }),
      delete: () => ({ eq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) })
    })
  };
  
  export const supabase = placeholderClient as any;
} else {
  // Create real Supabase client
  export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  
  console.log('✅ Supabase client initialized successfully');
}