import { mergeConfig } from "vite";
import path from "path";
import { commonConfig } from "./vite.config";

export default mergeConfig(commonConfig, {
  build: {
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
  },
});
