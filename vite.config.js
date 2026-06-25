import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        liff: 'liff-form.html',
        sec: 'liff-sec.html'
      }
    }
  },
});
