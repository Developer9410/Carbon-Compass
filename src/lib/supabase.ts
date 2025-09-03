import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

// Debug logging for development
console.log('Supabase Environment Check:', {
  url: supabaseUrl ? 'Set' : 'Missing',
  key: supabaseAnonKey ? 'Set' : 'Missing',
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  // Additional debug info
  allEnvVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
});

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    VITE_SUPABASE_URL: supabaseUrl ? 'Set' : 'Missing',
    VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? 'Set' : 'Missing'
  });
  
  throw new Error(
    'Missing Supabase environment variables. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.'
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

console.log('Supabase client initialized successfully');