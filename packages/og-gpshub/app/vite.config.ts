import { defineConfig } from "vite";
import path from "path";
import Checker from "vite-plugin-checker";
import fs from "fs";
import { AppConfig } from "og-core/src/types/appConfig";

function loadConfig(): AppConfig {
  const configPath = path.resolve(__dirname, "../og.config.json");
  const config: AppConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  return config;
}

export const commonConfig = defineConfig({
  plugins: [Checker({ typescript: true })],
  define: {
    __APP_CONFIG__: JSON.stringify(loadConfig()),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      src: path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: false,
    target: "es2020",
    outDir: "../dist/app",
    emptyOutDir: false,
  },
});
