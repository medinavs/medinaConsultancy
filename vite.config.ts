import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://uj58p9e8la.execute-api.us-east-2.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/dev/consultancy/search'),
      },
    },
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg'],
})