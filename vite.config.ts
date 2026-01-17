import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/pcb-vision-hub/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "copy-404",
      writeBundle() {
        const source = path.resolve(__dirname, "public/404.html");
        const dest = path.resolve(__dirname, "dist/404.html");
        if (fs.existsSync(source)) {
          fs.copyFileSync(source, dest);
        }
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
