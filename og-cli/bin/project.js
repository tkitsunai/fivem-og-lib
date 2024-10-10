import fs from "fs";
import path from "path";
import { createDirs } from "./config.js";
import { loadTemplate } from "./util.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// プロジェクト構造を作成する関数
export function createProjectStructure({ projectName, withui, framework }) {
  const appName = `og-${projectName}`;
  const appDir = path.join(process.cwd(), "packages", appName);

  if (fs.existsSync(appDir)) {
    console.error(`Error: Directory ${appName} already exists.`);
    process.exit(1);
  }

  console.log(`Creating a new project: ${appName}`);
  createDirectoryStructure(appDir, appName, withui);

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
}

// ディレクトリ構造を作成する関数
function createDirectoryStructure(appDir, appName, withui) {
  const dirsToCreate = createDirs.app.map((dirName) => path.join(appDir, dirName));

  // withuiがtrueの場合にuiディレクトリも追加
  if (withui) {
    const uiDirs = createDirs.ui.map((dir) => path.join(appDir, dir));
    dirsToCreate.push(...uiDirs);
  }

  dirsToCreate.forEach((dir) => {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  });

  createFxManifest(appDir, withui);
  createFile(path.join(appDir, "app", "package.json"), generateAppPackageJson(appName));
  createFile(path.join(appDir, "app", "tsconfig.json"), generateAppTsConfig());
  createFile(path.join(appDir, "app/src/server", "server.ts"), generateMinimalTs("server"));
  createFile(path.join(appDir, "app/src/client", "client.ts"), generateMinimalTs("client"));

  if (withui) {
    createFile(path.join(appDir, "ui", "index.html"), generateHtmlTemplate());
    createFile(path.join(appDir, "ui", "package.json"), generateUiPackageJson(appName));
    createFile(path.join(appDir, "ui", "vite.config.ts"), generateViteConfig());
    createFile(path.join(appDir, "ui", "tsconfig.json"), generateUiTsConfig());
    createFile(path.join(appDir, "ui/src/main.tsx"), generateMainTsx(appName));
  }

  console.log("Project structure created successfully.");
}

function createFxManifest(appDir, withui) {
  const fxmanifest = generateFxManifest(withui);
  createFile(path.join(appDir, "fxmanifest.lua"), fxmanifest);
}

function createFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Created file: ${filePath}`);
}

function generateMinimalTs(serverOrClient) {
  return `console.log("Hello from ${serverOrClient}!");`;
}

// app/package.jsonのテンプレートを生成
function generateAppPackageJson(appName) {
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

// app/tsconfig.jsonのテンプレートを生成
function generateAppTsConfig() {
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
        types: ["@citizenfx/server", "@citizenfx/client"],
      },
      include: ["src"],
      exclude: ["node_modules", "test"],
    },
    null,
    2
  );
}

// ui/index.htmlのテンプレートを生成
function generateHtmlTemplate() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>FiveM OG React + TypeScript + Vite</title>
    <script type="module" src="/src/main.tsx"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
}

// ui/package.jsonのテンプレートを生成
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

// vite.config.tsのテンプレートを生成
function generateViteConfig() {
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

// ui/tsconfig.jsonのテンプレートを生成
function generateUiTsConfig() {
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

// ui/src/main.tsxのテンプレートを生成
function generateMainTsx(appName) {
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

function generateFxManifest(withui) {
  // __dirnameの代わり
  const __filename = fileURLToPath(import.meta.url); // 現在のファイルパス
  const __dirname = dirname(__filename); // 現在のディレクトリパス

  const templatePath = path.join(__dirname, "templates", "fxmanifest.template.lua");
  let template = loadTemplate(templatePath);

  const filesSection = withui
    ? `
files {
  'dist/ui/index.html',
  'dist/ui/assets/index.js',
}`
    : "";

  const uiPageSection = withui ? `ui_page 'dist/ui/index.html'` : "";

  template = template.replace("{{files_section}}", filesSection).replace("{{ui_page_section}}", uiPageSection);

  return template;
}
