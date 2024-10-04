import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: ".",
  publicDir: "public",
  base: "./",
  build: {
    outDir: "../dist/ui",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },
});
