import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { cleanDirectory } from "./util.js";

// __dirnameの代わり
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRootDir = join(__dirname, "..", "..");

export function clean(projectName) {
  const targetDir = path.resolve(projectRootDir, "dist", projectName);
  cleanDirectory(targetDir);
  console.log(`Project ${projectName} cleaned successfully.`);
}
