import { mergeConfig } from "vite";
import path from "path";
import { commonConfig } from "./vite.config";

export default mergeConfig(commonConfig, {
  build: {
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
  },
});
