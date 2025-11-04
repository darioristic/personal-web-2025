// this script is run by the npm postinstall hook to copy the font
// files from the geist package to the fonts directory

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

// Define the source paths for Geist fonts relative to node_modules
const fontPaths = [
  {
    src: path.join(projectRoot, "node_modules/geist/dist/fonts/geist-sans/Geist-Light.ttf"),
    dest: path.join(projectRoot, "fonts/geist-light.ttf")
  },
  {
    src: path.join(projectRoot, "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf"),
    dest: path.join(projectRoot, "fonts/geist-regular.ttf")
  },
  {
    src: path.join(projectRoot, "node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf"),
    dest: path.join(projectRoot, "fonts/geist-medium.ttf")
  },
  {
    src: path.join(projectRoot, "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf"),
    dest: path.join(projectRoot, "fonts/geist-bold.ttf")
  },
  {
    src: path.join(projectRoot, "node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf"),
    dest: path.join(projectRoot, "fonts/geist-mono-regular.ttf")
  }
];

// Ensure the destination directory exists
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname, { recursive: true });
};

// Copy each font file
fontPaths.forEach(({ src, dest }) => {
  ensureDirectoryExistence(dest);
  const exists = fs.existsSync(dest);
  if (!exists && fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${path.basename(src)} to ${dest}`);
  }
});