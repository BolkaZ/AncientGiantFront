import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import checker from 'vite-plugin-checker';
// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  server: {
    host: '172.16.0.2',
    // Tauri expects a fixed port, fail if that port is not available
    strictPort: true,
    // if the host Tauri is expecting is set, use it
    port: 3000,
  },
  build: {
    target: 'chrome105'
  },
  base: "./",
  plugins: [react(), checker({ typescript: false })],
})