import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { "@": "/src" } },
  plugins: [react()],
  server: {
    host: true, // needed for the DC port mapping to work
    strictPort: true,
    port: 3000,
  },
});
