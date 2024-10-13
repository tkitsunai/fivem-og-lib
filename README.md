# FiveM Og Lib

## Overview

FiveM Og Library is a toolkit designed to help create and manage mods for FiveM with ease. The library focuses on building mods using modern web development technologies like TypeScript, React, and Vite, enabling quick and efficient development.

### Features:

- **TypeScript + React + Vite**: Utilize modern JavaScript tooling for faster and more maintainable mod development.
- **CLI for Mod Management**: Simplified commands to create, build, and manage your mods.
- **Modular System**: Create mods as individual apps that can be independently developed and tested.

## Installation

To install the CLI globally, follow these steps:

```bash
cd og-cli
pnpm link --global
```

This will link the CLI globally, allowing you to use og commands anywhere in your system.

## Creating a New Mod

To create a new mod project, run the following command:

`og create new-app`

Replace `new-app` with your mod's desired name. This will scaffold a new mod structure using the library's template.

## Development

Once your mod is created, start developing using the following commands:

### Install dependencies:

pnpm install

### Start the development server:

`pnpm -F "og-MODNAME-*" dev`

### Build for production:

When you're ready to deploy your mod, run:

`pnpm -F "og-MODNAME-*" build`

This will compile and bundle your mod for use in the FiveM server.

### MOD Packaging

By using the og-cli command run:

`og package <project-name>`

The built project is packaged into a format that can be distributed to the FiveM resources folder.

It creates an `fxmanifest.lua` from the result of the built project, which is necessary to apply the developed mod to a FiveM server.

If you create the project using the og-cli command `create <project-name>`, the `og.config.json` file is automatically generated. You can edit this configuration file to apply the necessary settings for generating the `fxmanifest.lua`.

## Mod Structure

Each mod is built following a modular structure to ensure maintainability and scalability. A typical mod project will include:

- `app/` - client/server code for your mod, written in TypeScript.
  - `client/` - Contains the code for client-side processing.
  - `lib/` - Contains the core code of the mod. It follows the folder structure based on Clean Architecture / Onion Architecture, and includes the mod's business logic.
  - `server/` - Contains the code for server-side processing.
  - `og.config.json` - Configuration file used by og-cli for mod packaging.
- `dist/` - The output folder where your production-ready mod will be compiled.

## Contributing

Feel free to submit issues or pull requests to improve the lib.

## License

MIT
