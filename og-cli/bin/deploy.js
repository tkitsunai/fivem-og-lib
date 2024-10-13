import fs from "fs";
import path from "path";
import { copyDir } from "./util.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configPath = path.resolve(__dirname, "deploy.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const BASE_PATH = config.deploy.basePath;
const MY_MODS_FOLDER = config.deploy.modsFolder;

export function deployProject(projectName) {
  const projectPath = path.resolve("./dist", projectName);
  const destinationPath = path.join(BASE_PATH, MY_MODS_FOLDER, projectName);

  if (!fs.existsSync(path.join(BASE_PATH, MY_MODS_FOLDER))) {
    console.log(`Creating folder: ${MY_MODS_FOLDER}`);
    fs.mkdirSync(path.join(BASE_PATH, MY_MODS_FOLDER), { recursive: true });
  }

  copyDir(projectPath, destinationPath);
  console.log(`Deployed ${projectName} to ${destinationPath}`);
}
