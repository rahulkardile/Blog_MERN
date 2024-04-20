import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  server:{
    proxy:{
      "/api":{
        target: 'https://blog-mern-api-topaz.vercel.app',
      }
    }
  },
  plugins: [react()],
})
