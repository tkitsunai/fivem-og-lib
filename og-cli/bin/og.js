#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// コマンドライン引数を取得
const args = process.argv.slice(2);

if (args[0] === "create" && args[1]) {
  const appName = `og-${args[1]}`;
  const appDir = path.join(process.cwd(), "packages", appName);

  if (fs.existsSync(appDir)) {
    console.error(`Error: Directory ${appName} already exists.`);
    process.exit(1);
  }

  console.log(`Creating a new project: ${appName}`);
  createProjectStructure(appDir, appName);

  console.info("=====================");
  console.info(
    "Please add the script for the created app to the package.json of the root project, which is managed as a monorepo."
  );

  const descriptionAddScript = `
    "scripts": {
      "${appName}": "pnpm -F ${appName}-*"
    }
`;
  console.info(descriptionAddScript);
  console.info("=====================");
} else {
  console.log("Usage: og create <project-name>");
}

// プロジェクト構造を作成する関数
function createProjectStructure(appDir, appName) {
  // ディレクトリの作成
  const dirsToCreate = [
    appDir,
    path.join(appDir, "app"),
    path.join(appDir, "app/src"),
    path.join(appDir, "app/src/client"),
    path.join(appDir, "app/src/server"),
    path.join(appDir, "app/test"),
    path.join(appDir, "ui"),
    path.join(appDir, "ui/public"),
    path.join(appDir, "ui/src"),
    path.join(appDir, "ui/src/test"),
  ];

  dirsToCreate.forEach((dir) => {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  });

  // create files
  createFile(path.join(appDir, "fxmanifest.lua"), genFxManifest());
  createFile(
    path.join(appDir, "app", "package.json"),
    genAppPackageJson(appName)
  );
  createFile(path.join(appDir, "app", "tsconfig.json"), genAppTsConfig());
  createFile(
    path.join(appDir, "app/src/server", "server.ts"),
    genMinTs("server")
  );
  createFile(
    path.join(appDir, "app/src/client", "client.ts"),
    genMinTs("client")
  );

  createFile(
    path.join(appDir, "ui", "index.html"),
    generateHtmlTemplate(appName)
  );
  createFile(
    path.join(appDir, "ui", "package.json"),
    generateUiPackageJson(appName)
  );
  createFile(path.join(appDir, "ui", "vite.config.ts"), genViteConfig(appName));
  createFile(path.join(appDir, "ui", "tsconfig.json"), genUITsConfig());
  createFile(path.join(appDir, "ui", "src", "main.tsx"), genMainTs(appName));

  console.log("Project structure created successfully.");
}

function createFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Created file: ${filePath}`);
}

function genMinTs(serverOrClient) {
  return `console.log("hello world ${serverOrClient}");`;
}

// fxmanifest.lua template
function genFxManifest() {
  return `
fx_version 'cerulean'
game 'gta5'

author 'Your Name'
description 'OG project template'
version '1.0.0'

client_script 'dist/app/src/client/client.js'
server_script 'dist/app/src/server/server.js'

files {
  'dist/ui/index.html'
}

ui_page 'dist/ui/index.html'
`;
}

// app/package.jsonのテンプレートを生成する関数
function genAppPackageJson(appName) {
  return JSON.stringify(
    {
      name: `${appName}-app`,
      version: "1.0.0",
      scripts: {
        build: "tsc -p tsconfig.json",
        test: "vitest run",
      },
    },
    null,
    2
  );
}

// ui/package.jsonのテンプレートを生成する関数
function generateUiPackageJson(appName) {
  return JSON.stringify(
    {
      name: `${appName}-ui`,
      version: "1.0.0",
      scripts: {
        dev: "vite",
        build: "vite build",
        test: "vitest run",
      },
      dependencies: {
        react: "^18.0.0",
        "react-dom": "^18.0.0",
      },
      devDependencies: {
        "@types/node": "^22.7.4",
        "@types/react": "^18.0.0",
        "@types/react-dom": "^18.0.0",
        "@vitejs/plugin-react": "^4.3.2",
      },
    },
    null,
    2
  );
}

// HTML template for the new project
function generateHtmlTemplate() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>FiveM OG React + TypeScript + Vite</title>
    <script type="module" src="/src/main.tsx"></script>
  </head>
  <body>
    <div id="root" />
  </body>
</html>`;
}

function genViteConfig() {
  return `
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
`;
}

function genMainTs(appName) {
  return `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div>
      <h1>OG Create APP!</h1>
      <h2>${appName}</h2>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`;
}

function genUITsConfig() {
  return JSON.stringify(
    {
      compilerOptions: {
        target: "ESNext",
        useDefineForClassFields: true,
        lib: ["DOM", "DOM.Iterable", "ESNext"],
        module: "ESNext",
        moduleResolution: "Node",
        strict: true,
        jsx: "react-jsx",
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
      },
      include: ["src"],
      exclude: ["node_modules", "test"],
    },
    null,
    2
  );
}

function genAppTsConfig() {
  return JSON.stringify(
    {
      compilerOptions: {
        target: "ESNext",
        useDefineForClassFields: true,
        module: "CommonJS",
        moduleResolution: "Node",
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        outDir: "../dist/app",
        baseUrl: "./",
        rootDir: "./",
      },
      include: ["src"],
      exclude: ["node_modules", "test"],
    },
    null,
    2
  );
}
