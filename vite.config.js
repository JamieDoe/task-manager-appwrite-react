import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './',
  base: '/',
  server: {
    port: 3000,
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
