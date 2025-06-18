import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    reporters: ['verbose'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js']
  }, 
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
