import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The '' argument tells Vite to load variables even if they don't start with VITE_
  const env = loadEnv(mode, '.', '');

  return {
    // CRITICAL FIX: This tells Vercel to serve the app from the root
    base: '/',

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    plugins: [react()],

    // This section maps your Vercel Environment Variables to the code
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
