import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve('src/'),
      '@rsces': path.resolve('src/'),
      '@rsces/assets': path.resolve('src/assets'),
      '@rsces/components': path.resolve('src/components'),
      '@rsces/layout': path.resolve('src/layout'),
      '@rsces/providers': path.resolve('src/providers'),
      '@rsces/routes': path.resolve('src/routes'),
      '@rsces/theme': path.resolve('src/theme'),
    },
  },
});
