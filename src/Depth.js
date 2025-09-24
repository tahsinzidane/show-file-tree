const fs = require("fs");
const path = require("path");

// List of folders to ignore
const ignore = ["node_modules", ".git"];

function printTreeWithDepth(dir, maxDepth, currentDepth = 0, prefix = "") {
  if (currentDepth >= maxDepth) return;

  const items = fs.readdirSync(dir).filter(item => !ignore.includes(item));
  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const connector = isLast ? "└── " : "├── ";

    console.log(prefix + connector + item);

    if (fs.statSync(fullPath).isDirectory()) {
      printTreeWithDepth(
        fullPath,
        maxDepth,
        currentDepth + 1,
        prefix + (isLast ? "    " : "│   ")
      );
    }
  });
}

module.exports = printTreeWithDepth;
