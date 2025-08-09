import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
  ],
  server: {
    port: 5123,
    strictPort: true
  },
  base: './',
  build: {
    outDir: 'dist-renderer'
  }
})