import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  // ---------------------------------------------------------
  // THE FIX: This dummy object prevents the "process is not defined" crash.
  // We do NOT need to load the API key here. The app handles it.
  // ---------------------------------------------------------
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
