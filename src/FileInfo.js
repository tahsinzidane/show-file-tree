const fs = require("fs");

function getFileInfo(fullPath) {
  const stats = fs.statSync(fullPath);
  const size = stats.isFile() ? `${(stats.size / 1024).toFixed(1)} KB` : "";
  const mtime = stats.mtime.toISOString().split("T")[0];
  return `${size} ${mtime}`.trim();
}

module.exports = getFileInfo;
