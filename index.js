#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// List of folders to ignore
const ignore = ['node_modules', '.git'];

function printTree(dir, prefix = '') {
  const items = fs.readdirSync(dir).filter(item => !ignore.includes(item));

  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    console.log(prefix + connector + item);

    if (fs.statSync(fullPath).isDirectory()) {
      printTree(fullPath, prefix + (isLast ? '    ' : '│   '));
    }
  });
}

const targetDir = process.argv[2] || process.cwd();
printTree(targetDir);
