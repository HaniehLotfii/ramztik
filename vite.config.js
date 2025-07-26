import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Ramztik",
        short_name: "Ramztik",
        start_url: "/",
        display: "standalone",
        background_color: "#1a1a1a",
        theme_color: "#00ACC1",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/scnarrow.png",
            sizes: "427x757",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/scwide.png",
            sizes: "1920x907",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
});
