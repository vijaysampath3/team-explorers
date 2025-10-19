import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  base: process.env.NODE_ENV === 'production' ? '/Myproject/' : '/',
  build: {
    outDir: 'dist',
  },
})
