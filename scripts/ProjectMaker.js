"use strict";

const path = require("path");
const urlPathMaker  = require("../func/utils/utils");
const fs = require("fs");
const { src, dest } = require("gulp");
const config = require("../func/config/configLoader");
const readline = require('readline');

class ProjectMaker {

  #src;

  #dest;

  #directories;

  /**
   *
   * @param {src : string , dest : string , directories : [strings]} options
   */

  constructor(options = {}) {

    try {

      const makeSrc = urlPathMaker.twhUrlPathMaker({
        topFolder: config.settings.mainfolder,
        folder: config.settings.projectfolder,
      });
  
      const makeDest = urlPathMaker.twhUrlPathMaker();
  
      this.#src = options.src || makeSrc;
      this.#dest = options.dest || makeDest;
  
      this.#directories = options.dir || [];

    }catch(err) {
      console.log("Project builder construct failed :", err);
    }
    
  }

  /**
   * Display the folder information
   * @param {string} info
   */

  displayInfo(info = "Dir and File Information: ") {
    
    console.log(info);

    console.log("Source : ", this.#src);
    console.log("Destination :", this.#dest);
    console.log("Folders: ", this.#directories);

  }

  /**
   * Copy the folder of src and html on destination provided that it exist.
   */

  async createNewProjectSync() {
    try {
      
      fs.readdir(this.#dest, async (err, files) => {
        if (err) {
          console.error(`Error reading directory ${this.#dest}: ${err}`);
          console.log("Does Not Exist");
          return;
        } else {
          console.log("Folder exist :", this.#dest, files);

          /** Wait for each process */
          for(const directory of this.#directories){
            
            if (files.includes(directory)) {
              console.log("Sub Dir Exist: ", directory);

            } else {
              
              console.log("Sub Dir Non Existing copy DIR : ", directory);
              await this.#copyDirectorySync(directory);
           
            }

          }
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

  async #copyDirectorySync(directory) {
    /** issue of file copy  */
    try {

      const userConfirmed = await this.#confirmationCopySync();

      if(userConfirmed) {
        
        const srcPath = path.join(this.#src, directory);
        const destPath = path.join(this.#dest, directory);

        console.log("src ", srcPath);
        console.log("dest ", destPath);

       src(srcPath + "/**/*")
          .pipe(dest(destPath));
        
        console.log("Copy completed ", directory);

      }else {
        console.log("Operation Cancelled ");
      }
      
    } catch (err) {
      console.log("Copy Dir error : ", err);
    }
  }


  async #confirmationCopySync() {
    
    try {
      /** return promise for the await to function */
      return new Promise(resolve => {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
  
        rl.question("Are you use you want to continue y/n : " , 
          (answer) => {
            rl.close();
  
            if(answer.toLowerCase() === 'y') {
              
              console.log("User execute operation.");
              resolve(true);

            }else if(answer.toLowerCase() === 'n'){
              
              console.log("User cancelled operation.");
              resolve(false);
  
            }else {
              console.log("User input invalid.")
              resolve(false);
            }
  
        });
      });

    }catch(err) {
      console.lof("Confirmation error :" , err);
    }
  }
  
}

module.exports = ProjectMaker;