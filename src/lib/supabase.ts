import { createClient } from '@supabase/supabase-js';

// Get environment variables with multiple fallback methods
const getEnvVar = (key: string): string | undefined => {
  // Try import.meta.env first (Vite's preferred method)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const value = import.meta.env[key];
    if (value) return value;
  }
  
  // Try process.env as fallback
  if (typeof process !== 'undefined' && process.env) {
    const value = process.env[key];
    if (value) return value;
  }
  
  // Try window environment (for runtime injection)
  if (typeof window !== 'undefined' && (window as any).env) {
    const value = (window as any).env[key];
    if (value) return value;
  }
  
  return undefined;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

// Enhanced debug logging
console.log('Supabase Environment Debug:', {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'Missing',
  key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'Missing',
  mode: typeof import.meta !== 'undefined' ? import.meta.env?.MODE : 'unknown',
  dev: typeof import.meta !== 'undefined' ? import.meta.env?.DEV : 'unknown',
  // Show all available VITE_ variables for debugging
  availableViteVars: typeof import.meta !== 'undefined' && import.meta.env 
    ? Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
    : [],
  // Show process.env VITE_ variables
  processEnvViteVars: typeof process !== 'undefined' && process.env
    ? Object.keys(process.env).filter(key => key.startsWith('VITE_'))
    : []
});

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = `
Missing Supabase environment variables:
- VITE_SUPABASE_URL: ${supabaseUrl ? 'Set' : 'Missing'}
- VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'Set' : 'Missing'}

Please ensure these variables are configured in your deployment environment.
For local development, add them to your .env file.
For production, add them to your hosting platform's environment variables.
  `.trim();
  
  console.error(errorMessage);
  throw new Error(errorMessage);
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

console.log('✅ Supabase client initialized successfully');