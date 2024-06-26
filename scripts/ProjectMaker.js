"use strict";

const path = require("path");
const urlPathMaker = require("../func/utils/utils");
const fs = require("fs");
const { src, dest } = require("gulp");

class ProjectMaker {
  /**
   *
   * @param {src : string , dest : string , directories : [strings]} options
   */

  constructor(options = {}) {
    const makeSrc = urlPathMaker.twhUrlPathMaker({
      topFolder: "node_modules",
      folder: "theme_3_v1",
    });
    const makeDest = urlPathMaker.twhUrlPathMaker();

    this.src = options.src || makeSrc;
    this.dest = options.dest || makeDest;

    this.directories = options.dir || [];
  }

  /**
   * Display the folder information
   * @param {string} info
   */

  displayInfo(info = "Dir and File Information") {
    console.log(info);
    console.log("Source : ", this.src);
    console.log("Destination :", this.dest);

    console.log("Folders: ");
    this.directories.forEach((diretory) => {
      console.log(diretory);
    });

    console.log(this.directories);
  }

  /**
   * Copy the folder of src and html on destination provided that it exist.
   */

  async createNewProject() {
    try {
      fs.readdir(this.dest, (err, files) => {
        if (err) {
          console.error(`Error reading directory ${this.dest}: ${err}`);
          console.log("Does Not Exist");
          return;
        } else {
          console.log("Folder exist :", this.dest, files);

          this.directories.forEach((directory) => {
            if (files.includes(directory)) {
              console.log("Sub Dir Exist: ", directory);
            } else {
              console.log("Sub Dir Non Existing: ", directory);
              this.copyDirectory(directory);
            }
          });

          return true;
        }
      });
    } catch (err) {
      console.log("Destination check error :", err);
    }
  }

  /**
   * Copy the directory of the dir defined.
   * @param {string} directory
   */

  async copyDirectory(directory) {
    /** issue of file copy  */
    try {
      const srcPath = path.join(this.src, directory);
      const destPath = path.join(this.dest, directory);

      console.log("src ", srcPath);
      console.log("dest ", destPath);

      src(srcPath + "/**/*")
        .pipe(dest(destPath))
        .on("end", () => {
          console.log("Copy completed ", directory);
        });
    } catch (err) {
      console.log("Copy Dir error : ", err);
    }
  }
}

module.exports = ProjectMaker;
