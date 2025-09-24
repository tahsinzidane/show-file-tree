const fs = require("fs");
const path = require("path");
const getFileInfo = require("./FileInfo");

const ignore = ["node_modules", ".git"];

function printTreeWithDepth(dir, maxDepth, showInfo = false, currentDepth = 0, prefix = "") {
  if (currentDepth >= maxDepth) return;

  const items = fs.readdirSync(dir).filter(item => !ignore.includes(item));
  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const connector = isLast ? "└── " : "├── ";

    let line = prefix + connector + item;
    if (showInfo) line += " " + getFileInfo(fullPath);

    console.log(line);

    if (fs.statSync(fullPath).isDirectory()) {
      printTreeWithDepth(
        fullPath,
        maxDepth,
        showInfo,
        currentDepth + 1,
        prefix + (isLast ? "    " : "│   ")
      );
    }
  });
}

module.exports = printTreeWithDepth;
