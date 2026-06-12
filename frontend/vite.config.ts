import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendTarget = env.VITE_API_URL || 'http://127.0.0.1:3000'
  const wsTarget = backendTarget.replace(/^https/, 'wss').replace(/^http/, 'ws')

  // If pointing to remote backend, don't proxy — let the browser connect directly
  const useProxy = !env.VITE_API_URL

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      ...(useProxy && {
        proxy: {
          '/health': { target: backendTarget, changeOrigin: true },
          '/player': { target: backendTarget, changeOrigin: true },
          '/admin':  { target: backendTarget, changeOrigin: true },
          '/socket.io': { target: wsTarget, ws: true, changeOrigin: true },
        },
      }),
    },
  }
})
