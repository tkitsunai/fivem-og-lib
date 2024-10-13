import fs from "fs";
import path from "path";
import { copyDir } from "./util.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// __dirnameの代わり
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRootDir = join(__dirname, "..", "..");

export function packageProject(projectName) {
  const projectDir = path.join(projectRootDir, "packages", projectName);
  const distDir = path.join(projectRootDir, "dist", projectName);

  console.log(`Packaging ${projectName}...`);

  if (!fs.existsSync(projectDir)) {
    console.error(`Error: Project ${projectName} does not exist.`);
    process.exit(1);
  }

  console.log(`Packaging build output to ${distDir}...`);
  copyBuildOutput(projectDir, distDir);
}

function copyBuildOutput(srcDir, destDir) {
  const buildDist = path.join(srcDir, "dist");
  if (!fs.existsSync(buildDist)) {
    console.error(`Error: Build output directory ${buildDist} does not exist.`);
    process.exit(1);
  }
  fs.mkdirSync(destDir, { recursive: true });
  copyDir(buildDist, path.join(destDir, "dist"));
}
