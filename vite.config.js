import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: 'src',
  base: '/meeting_AI/',
  publicDir: '../public',
  build: {
    outDir: path.resolve(__dirname, '.'),
    emptyOutDir: false,
  },
  plugins: [react(), tailwindcss()],
})
