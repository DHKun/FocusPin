import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  root: '.',
  server: {
    port: 3000,
    strictPort: true,
    host: '0.0.0.0',
  },
  build: {
    target: 'esnext',
    outDir: './dist',
    rollupOptions: {
      input: {
        main: './src/index.html',
      },
    },
  },
});