#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const depthTree = require("./src/Depth");
const getFileInfo = require("./src/FileInfo");

const ignore = ["node_modules", ".git"];

function printTree(dir, prefix = "", showInfo = false) {
  let items;
  try {
    items = fs.readdirSync(dir, { withFileTypes: true })
      .map(entry => entry.name)
      .filter(item => !ignore.includes(item));
  } catch (error) {
    console.warn("Skipping:", dir, error.code);
    return;
  }

  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const connector = isLast ? "└── " : "├── ";

    let line = prefix + connector + item;
    if (showInfo) line += " " + getFileInfo(fullPath);

    console.log(line);

    try {
      if (fs.statSync(fullPath).isDirectory()) {
        printTree(fullPath, prefix + (isLast ? "    " : "│   "), showInfo);
      }
    } catch (error) {
      console.warn("Skipping:", fullPath, error.code);
    }
  });
}

// args handling
const args = process.argv.slice(2);
const depthFlagIndex = args.findIndex(arg => arg === "-d" || arg === "--depth");
const infoFlag = args.includes("--info") || args.includes("-i");
const targetDir = process.cwd();

console.log("📂 " + targetDir);

if (depthFlagIndex !== -1 && args[depthFlagIndex + 1]) {
  const depthLimit = parseInt(args[depthFlagIndex + 1], 10);
  depthTree(targetDir, depthLimit, infoFlag);
} else {
  printTree(targetDir, "", infoFlag);
}
