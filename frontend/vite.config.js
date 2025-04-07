import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import path from "path"; // Required for path aliases

export default defineConfig({
  plugins: [
    react(),

    // VitePWA({
    //   registerType: "autoUpdate",
    //   manifest: {
    //     name: "CampQuest - Find Your Perfect Campsite",
    //     short_name: "CampQuest",
    //     theme_color: "#ffffff",
    //     icons: [
    //       {
    //         src: "CampQuest.svg",
    //         sizes: "512x512",
    //         type: "image/svg+xml",
    //       },
    //     ],
    //   },
    // }),
  ],
  base: "/CampQuest/frontend",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // shadcn-ui path alias
    },
  },
});
