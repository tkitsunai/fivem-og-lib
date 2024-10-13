import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRootDir = join(__dirname, "..", "..");

function createContent(projectName, author, fileList) {
  const clientFiles = fileList
    .filter((file) => file.type === "client")
    .map((file) => file.fileName);

  const serverFiles = fileList
    .filter((file) => file.type === "server")
    .map((file) => file.fileName);

  return `
fx_version 'cerulean'
game 'gta5'

author '${author}'
description 'MOD: ${projectName}'
version '1.0.0'

client_scripts {
  ${clientFiles.map((file) => `'${file}'`).join("\n")}
}
server_scripts {
  ${serverFiles.map((file) => `'${file}'`).join("\n")}
}
`;
}

function getFileList(dirPaths) {
  return dirPaths
    .map((target) => {
      try {
        return fs.readdirSync(target.path).map((fileNames) => {
          return {
            type: target.type,
            fileName: path.posix.join(target.posix, fileNames),
          };
        });
      } catch (err) {
        console.error(`Failed to read directory: ${target}`, err);
        return [];
      }
    })
    .flat();
}

function readConfig(projectName) {
  const configPath = path.resolve(projectRootDir, "packages", projectName, "og.config.json");

  if (!fs.existsSync(configPath)) {
    console.error(`Not found og.config.json on the ${projectName} directory`);
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}

export function generateFxManifest(projectName) {
  const config = readConfig(projectName);

  const outputDir = path.resolve(projectRootDir, "dist", projectName);
  const outputPath = path.resolve(outputDir, "fxmanifest.lua");

  const fileDirs = [
    {
      path: path.resolve(outputDir, "dist", "app", "client"),
      posix: path.posix.join("dist", "app", "client"),
      type: "client",
    },
    {
      path: path.resolve(outputDir, "dist", "app", "server"),
      posix: path.posix.join("dist", "app", "server"),
      type: "server",
    },
  ];

  const fileList = getFileList(fileDirs);

  fs.writeFileSync(
    outputPath,
    createContent(config.project.name, config.project.version, fileList),
    "utf-8"
  );

  console.log(`fxmanifest.lua has been builded at ${outputPath}`);
}
