import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site at https://<owner>.github.io/<repo>/
  base: '/react-cafe-project-khanh/',
})
