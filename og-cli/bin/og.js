#!/usr/bin/env node
import { Command } from "commander";
import { createProjectStructure } from "./project.js";
import { packageProject } from "./package.js";
import { deployProject } from "./deploy.js";
import { generateFxManifest } from "./genFxManifest.js";
import { clean } from "./clean.js";
import inquirer from "inquirer";

const program = new Command();

program
  .command("create <projectName>")
  .description("Create a new project")
  .action(async (projectName) => {
    const answers = await inquirer.prompt([
      {
        type: "confirm",
        name: "withui",
        message: "Do you want to with UI?",
        default: true,
      },
      {
        type: "list",
        name: "framework",
        message: "Which framework do you want to use?",
        choices: ["QBCore", "Custom"],
      },
    ]);

    const { withui, framework } = answers;

    console.log("Project details:");
    console.log(`- Project Name: ${projectName}`);
    console.log(`- Use UI(React): ${withui ? "Yes" : "No"}`);
    console.log(`- Framework: ${framework}`);

    createProjectStructure({ projectName, withui, framework });
  });

program
  .command("package <projectName>")
  .description("Package the project")
  .action((projectName) => {
    packageProject(projectName);
    generateFxManifest(projectName);
    console.log(`Project ${projectName} packaged successfully.`);
  });

program
  .command("clean <projectName>")
  .description("clean packaged project")
  .action((projectName) => {
    clean(projectName);
  });

program
  .command("deploy <projectName>")
  .description("deploy to the server resources")
  .action((projectName) => {
    deployProject(projectName);
  });

program.parse(process.argv);
