import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa';
// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';
import mkcert from 'vite-plugin-mkcert'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/AncientGiantFront',
  server: { port: 3000,  proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },

    },
      },
  plugins: [react(),mkcert(), VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true,
    },
    manifest:{
      name: "Tile Notes",
      short_name: "Tile Notes",
      start_url: "/",
      display: "standalone",
      background_color: "#fdfdfd",
      theme_color: "#db4938",
      orientation: "portrait-primary",
      icons: [
        {
          "src": "/logo192.png",
          "type": "image/png", "sizes": "192x192"
        },
        {
          "src": "/logo512.png",
          "type": "image/png", "sizes": "512x512"
        }
      ],
    }
  })],
})