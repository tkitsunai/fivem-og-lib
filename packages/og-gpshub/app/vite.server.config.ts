import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        server: path.resolve(__dirname, "src/server/server.ts"),
      },
      output: {
        dir: "../dist/app",
        entryFileNames: "[name]/[name].js",
        format: "es",
      },
    },
    target: "es2020",
    outDir: "../dist/app",
    emptyOutDir: false,
  },
});
