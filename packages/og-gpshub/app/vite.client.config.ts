import { defineConfig } from "vite";
import path from "path";
import Checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [Checker({ typescript: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  build: {
    minify: false,
    rollupOptions: {
      input: {
        client: path.resolve(__dirname, "src/client/client.ts"),
      },
      output: {
        dir: "../dist/app",
        entryFileNames: "client/client.js",
        format: "iife",
        name: "OG_gpshub_client",
        manualChunks: undefined,
        inlineDynamicImports: false,
      },
    },
    target: "es2020",
    outDir: "../dist/app",
    emptyOutDir: false,
  },
});
