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
  availableViteVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')),
  processEnvKeys: typeof process !== 'undefined' ? Object.keys(process.env || {}).filter(key => key.startsWith('VITE_')) : 'N/A'
});

// Declare supabase variable at top level
let supabase: any;

// For Bolt Hosting, we need to provide a way to configure Supabase
if (!supabaseUrl || !supabaseAnonKey) {
  console.log('Missing Supabase environment variables:', {
    'VITE_SUPABASE_URL': supabaseUrl ? 'Set' : 'Missing',
    'VITE_SUPABASE_ANON_KEY': supabaseAnonKey ? 'Set' : 'Missing'
  });
  
  const errorMessage = `Missing Supabase environment variables:
- VITE_SUPABASE_URL: ${supabaseUrl ? 'Set' : 'Missing'}
- VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'Set' : 'Missing'}

Please ensure these variables are configured in your deployment environment.
For local development, add them to your .env file.
For production, add them to your hosting platform's environment variables.`;

  console.error(errorMessage);
  throw new Error(errorMessage);
} else {
  // Create real Supabase client
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  
  console.log('✅ Supabase client initialized successfully');
}

export { supabase };