import fs from "fs";

export function loadTemplate(templatePath) {
  return fs.readFileSync(templatePath, "utf8");
}

export function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`Source directory ${src} does not exist.`);
    process.exit(1);
  }

  fs.mkdirSync(dest, { recursive: true });

  const items = fs.readdirSync(src);
  items.forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${srcPath} to ${destPath}`);
    }
  });
}
