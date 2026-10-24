import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/samayupadhya-website/',
  plugins: [react(), tailwindcss()],
  // Two pages: the home page and /archive/.
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        archive: resolve(import.meta.dirname, 'archive/index.html'),
      },
    },
  },
})
