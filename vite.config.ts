import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Ensure environment variables are properly injected at build time
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || ''),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || ''),
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Ensure environment variables are available in production
    rollupOptions: {
      external: [],
    },
  },
  // Ensure environment variables are loaded
  envPrefix: 'VITE_',
});