import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', // Render espera los archivos en "dist"
  },
  base: './', // Mantener '/' si la app está en la raíz del dominio
})
