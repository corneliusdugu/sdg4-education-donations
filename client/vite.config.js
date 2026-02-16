import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,          // important for Codio
    port: 5173,
    strictPort: true,
    proxy: {
      // Any request to /api on the Vite dev server will be forwarded to Express
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
