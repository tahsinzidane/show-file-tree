#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const depthTree = require("./src/Depth");
const getFileInfo = require("./src/FileInfo");

const ignore = ["node_modules", ".git"];

function printTree(dir, prefix = "", showInfo = false) {
  const items = fs.readdirSync(dir).filter(item => !ignore.includes(item));
  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const connector = isLast ? "└── " : "├── ";

    let line = prefix + connector + item;
    if (showInfo) line += " " + getFileInfo(fullPath);

    console.log(line);

    if (fs.statSync(fullPath).isDirectory()) {
      printTree(fullPath, prefix + (isLast ? "    " : "│   "), showInfo);
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
  // infoFlag 
  depthTree(targetDir, depthLimit, infoFlag);
} else {
  printTree(targetDir, "", infoFlag);
}
