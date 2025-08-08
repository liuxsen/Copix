import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5123,
    strictPort: true
  },
  base: './',
  build: {
    outDir: 'dist-renderer'
  }
})