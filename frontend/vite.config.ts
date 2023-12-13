import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@globalTypes': path.resolve(__dirname, './src/globalTypes'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        secure: false,
      },
      '/imgs': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        secure: false,
      },
      '/game': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        secure: false,
      },
      // '/chat': {
      //   target: 'http://localhost:3001/',
      //   changeOrigin: true,
      //   secure: false,
      // },
    },
  },
});
