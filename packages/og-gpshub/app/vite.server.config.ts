import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      src: path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: false,
    rollupOptions: {
      input: {
        server: path.resolve(__dirname, "src/server/server.ts"),
      },
      output: {
        dir: "../dist/app",
        entryFileNames: "[name]/[name].js",
        name: "gpshub_server",
        format: "es",
      },
    },
    target: "es2020",
    outDir: "../dist/app",
    emptyOutDir: false,
  },
});
