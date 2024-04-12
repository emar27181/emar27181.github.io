import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES
    ? "emar27181.github.io"
    : "./",
  plugins: [react()],
  build: { chunkSizeWarningLimit: 100000000 },
  server: {
    port: 3000,
    host: true,
  },
})
