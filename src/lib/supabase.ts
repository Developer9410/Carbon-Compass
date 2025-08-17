import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging for development
if (import.meta.env.DEV) {
  console.log('Environment check:', {
    url: supabaseUrl ? 'Set' : 'Missing',
    key: supabaseAnonKey ? 'Set' : 'Missing',
    mode: import.meta.env.MODE
  });
}

// Create Supabase client or mock client
let supabase: any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not configured. Running in demo mode.');
  
  // Create a mock client that provides demo functionality
  supabase = {
    auth: {
      signUp: async () => {
        console.log('Demo mode: Sign up attempted');
        return { 
          data: { user: null, session: null }, 
          error: { message: 'Demo mode: Please configure Supabase to enable authentication' }
        };
      },
      signInWithPassword: async () => {
        console.log('Demo mode: Sign in attempted');
        return { 
          data: { user: null, session: null }, 
          error: { message: 'Demo mode: Please configure Supabase to enable authentication' }
        };
      },
      signOut: async () => {
        console.log('Demo mode: Sign out attempted');
        return { error: null };
      },
      getSession: async () => {
        return { data: { session: null }, error: null };
      },
      getUser: async () => {
        return { data: { user: null }, error: null };
      },
      onAuthStateChange: (callback: any) => {
        console.log('Demo mode: Auth state change listener registered');
        return { 
          data: { 
            subscription: { 
              unsubscribe: () => console.log('Demo mode: Auth listener unsubscribed') 
            } 
          } 
        };
      }
    },
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          single: async () => {
            console.log(`Demo mode: SELECT from ${table} WHERE ${column} = ${value}`);
            return { data: null, error: { message: 'Demo mode: Database not configured' } };
          },
          maybeSingle: async () => {
            console.log(`Demo mode: SELECT from ${table} WHERE ${column} = ${value}`);
            return { data: null, error: null };
          }
        }),
        order: (column: string, options?: any) => ({
          limit: (count: number) => ({
            then: async (callback: any) => {
              console.log(`Demo mode: SELECT from ${table} ORDER BY ${column} LIMIT ${count}`);
              return callback({ data: [], error: null });
            }
          })
        })
      }),
      insert: async (data: any) => {
        console.log(`Demo mode: INSERT into ${table}:`, data);
        return { 
          data: null, 
          error: { message: 'Demo mode: Database not configured' },
          select: () => ({
            single: async () => ({ data: null, error: { message: 'Demo mode: Database not configured' } })
          })
        };
      },
      update: (data: any) => ({
        eq: (column: string, value: any) => {
          console.log(`Demo mode: UPDATE ${table} SET ${JSON.stringify(data)} WHERE ${column} = ${value}`);
          return Promise.resolve({ data: null, error: { message: 'Demo mode: Database not configured' } });
        }
      }),
      delete: () => ({
        eq: (column: string, value: any) => {
          console.log(`Demo mode: DELETE from ${table} WHERE ${column} = ${value}`);
          return Promise.resolve({ data: null, error: { message: 'Demo mode: Database not configured' } });
        }
      })
    })
  };
} else {
  // Create real Supabase client
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  
  console.log('Supabase client initialized successfully');
}

export { supabase };