import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_PATH || '/'

  return {
    plugins: [react(), tailwindcss()],
    base,
    server: { port: 3002, cors: true },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          'product-map': resolve(__dirname, 'product-map.html'),
        },
      },
    },
  }
})
