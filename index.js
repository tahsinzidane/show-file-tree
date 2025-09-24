#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const depthTree = require("./src/Depth");

// List of folders to ignore
const ignore = ["node_modules", ".git"];

function printTree(dir, prefix = "") {
  const items = fs.readdirSync(dir).filter(item => !ignore.includes(item));
  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const connector = isLast ? "└── " : "├── ";
    console.log(prefix + connector + item);

    if (fs.statSync(fullPath).isDirectory()) {
      printTree(fullPath, prefix + (isLast ? "    " : "│   "));
    }
  });
}

const args = process.argv.slice(2);
const depthFlagIndex = args.findIndex(arg => arg === "-d" || arg === "--depth");
let targetDir = process.cwd();

if (depthFlagIndex !== -1 && args[depthFlagIndex + 1]) {
  const depthLimit = parseInt(args[depthFlagIndex + 1], 10);
  console.log("📂 " + targetDir);
  depthTree(targetDir, depthLimit);
} else {
  console.log("📂 " + targetDir);
  printTree(targetDir);
}
