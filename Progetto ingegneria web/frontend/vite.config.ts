import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/forum": "http://localhost:3000",
      //"/img": "http://localhost:3000"
    }
  },
  build: {
    rollupOptions: {
      input: './src/main.ts', // Sostituisci con il percorso del tuo entry point
    },
  }
});
