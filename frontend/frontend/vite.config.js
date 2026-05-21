import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
       
      '/quote': {          //this matches the BASE URL in commoditiesAPI.js and the backend server route (commodityController file)
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})