"use strict";

const { dir } = require("console");
const fs = require("fs");
const path = require("path");
const urlPathMaker = require("../func/utils/utils");

class FileLister {
  constructor(dirs = {}) {
    this.dirs = [];

    if (Array.isArray(dirs)) {
      dirs.forEach((dir) => {
        let temp = urlPathMaker.twhUrlPathMaker({ topFolder: dir });
        this.dirs.push(temp);
      });
    } else {
      this.dirs = urlPathMaker.twhUrlPathMaker({ topFolder: dirs });
    }
  }

  getFilesAndDirs(dir) {
    
    try {
      const items = fs.readdirSync(dir);
      const results = {};

      items.forEach((item) => {
        const itemPath = path.join(dir, item);

        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
          results[item] = this.getFilesAndDirs(itemPath);
        } else {
          results[item] = "file";
        }
      });

      return results;

    } catch (err) {
      console.log("Get Files and Directory :", err);
    }

    
  }

  compareDirs() {
    if (this.dirs.length < 2) {
      console.log("At least two directories are required to compare.");
      return;
    }

    const dirA = this.dirs[0];
    const dirB = this.dirs[1];

    console.log(`Comparing directories:\n${dirA}\n${dirB}\n`);

    this.compareDirectories(dirA, dirB);
  }

  compareDirectories(dirA, dirB, depth = 0) {

    const prefix = "-".repeat(depth * 2);

    const contentsA = this.getFilesAndDirs(dirA);
    const contentsB = this.getFilesAndDirs(dirB);

    const iconTypes = {
      folderA: "❌ (A)",
      folderB: "❌ (B)",
      iconFile: "📄",
      iconfolder: "📁",
      iconX: "❌",
      iconWarn: "⚠️",
    };

    const allKeys = new Set([
      ...Object.keys(contentsA),
      ...Object.keys(contentsB),
    ]);

    let icon = "";

    allKeys.forEach((key) => {
      if (!contentsA[key]) {
        if (typeof contentsB[key] === "object") {
          icon = iconTypes.iconfolder;
        } else {
          icon = iconTypes.iconFile;
        }

        console.log(
          `${prefix} ${iconTypes.iconWarn}  Missing in " ${iconTypes.folderA}: ${icon} ${key}`
        );
      } else if (!contentsB[key]) {
        if (typeof contentsA[key] === "object") {
          icon = iconTypes.iconfolder;
        } else {
          icon = iconTypes.iconFile;
        }

        console.log(
          `${prefix} ${iconTypes.iconWarn}  Missing in "${iconTypes.folderB}": ${icon} ${key} `
        );
      } else if (
        typeof contentsA[key] === "object" &&
        typeof contentsB[key] === "object"
      ) {
        console.log(`${prefix}${iconTypes.iconfolder} ${key}`);

        this.compareDirectories(
          path.join(dirA, key),
          path.join(dirB, key),
          depth + 1
        );
      } else if (contentsA[key] === "file" && contentsB[key] === "file") {
        console.log(`${prefix}${iconTypes.iconFile}${key}`);
      } else {
        console.log(`${prefix}${iconTypes.iconWarn} Type mismatch:${key}`);
      }
    });
  }

  listFileDirectory() {}
}

module.exports = FileLister;
