"use strict";

const config = require("../../config/config");
const { src, dest, watch } = require("gulp");
const uglify = require("gulp-uglify");
const argv = require("yargs").argv;
const browserSync = require('browser-sync').create();
const path = require("path");
const handler = require("../../gulp/classes/Handler");

class GulpJSTaskManager {
  
  /**
   * Accepts array of options
   * @param {options.src : string , options.autoInit : boolean, 
   *  options.watch : boolean , options.build : boolean , 
   *  options.key : string || array strings , options.uglify } options
   * { autoInit : bool, build : bool, key : string }
  */

  #src;

  #autoInit;

  #baseDest;

  #dest;

  #options;

  constructor(options = {}) {

    /** List */

    this.#src = options.src || [];
    this.#autoInit = options.autoInit || false;
    this.#baseDest = config.jspaths.maindest;
    //this.#dest = argv.dest || config.jspaths.maindest;
    //this.#dest = argv.dest ? `${this.baseDest}/${argv.dest}` : this.#baseDest;
    this.#dest = this.#getDestPath(argv.dest);
    this.#options = options;


    this.#options.watch = options.watch || false;

    if (this.#autoInit !== false && this.#checkInvalidArgs) {
      this.#checkFlags();
    }
  }
  
  /**
   * This will return all options
   * @returns array 
  */

  getOptions() {
    return this.#options;
  }

  /**
   * Check path supplied by --dest is not empty and not a number value
   * @param {string} destArgv
   * @returns string
  */

  #getDestPath(destArgv) {
    if (destArgv === true || destArgv === undefined || typeof destArgv !== 'string') {
     
      if(typeof destArgv !== 'string') {
        console.log("Path not a valid string , default to: ", this.#baseDest);
      }else {
        console.log("Path not provided default to: ", this.#baseDest);
      }

      return this.#baseDest;
    
    }

    return path.join(this.#baseDest, destArgv);
  }

  /**
   *  Accept argument on CLI , check config.js jspaths for keys
   *  gultTasks task --option --option
   *
  */

  #checkFlags() {
    config.jspaths.paths.forEach((item) => {
      if (argv[item.key]) {
        this.#src.push(item.path);
      }
    });

    if (this.#src.length === 0) {
      console.log("Option not available compiling JS ...");
      console.log("Please check ", config.info.compileJS);
    }
  }

    /**
     * Check if the commands are correct
     * @returns boolean
    */

    #checkInvalidArgs() {

      const validKeys = config.jspaths.paths.map(item => item.key).concat(['dest', 'uglify']);
      const invalidKeys = Object.keys(argv).filter(key => key !== '_' && key !== '$0' && !validKeys.includes(key));
      
      if (invalidKeys.length > 0) {
          console.log("Invalid options provided: ", invalidKeys.join(', '));
          console.log("Please check the available options: ", validKeys.join(', '));
          return false;
      } else {
          return true;
      }

    }
  
    /**
     * This will set the source for the build request
     * @param {Array || string } 
    */

  #buildSet(typeBuild) {

    let checkAvailable = false;

    if(Array.isArray(typeBuild)) {

        typeBuild.forEach(key => {
            config.jspaths.paths.forEach((item) => {
         
                if (item.key === key) {
                  this.#src.push(item.path);
                  checkAvailable = true;
                  console.log("Type Build " , key);
                }
            });
        });

    }else {
        config.jspaths.paths.forEach((item) => {
         
            if (item.key === typeBuild) {
              this.#src.push(item.path);
              checkAvailable = true;
              console.log("Type Build " , typeBuild);
            }
        });
    }
    
    if (checkAvailable === false) {
        console.log(
          typeBuild,
          "Not available please check config for available keys ..."
        );
    }
  }

  /**
   * This will build the JS to the destination
   * @returns gulp task
   */

  async compileJS() {
    
    if (this.#options.build === true) {
      let typeBuild = this.#options.key;
      console.log("Building invoke for...", typeBuild);

      this.#buildSet(typeBuild);
    }

    console.log("Source Path :", this.#src);
    console.log("Destination Path :", this.#dest);

    /** Input and Command Checker */
    if (this.#src.length === 0 || this.#checkInvalidArgs === false) {
      console.log("No valid option provided ending process ...");
      return;
    }

    let stream = src(this.#src);

    if (argv.uglify || this.#options.uglify) {
     
      stream = stream.pipe(uglify()
        .on('error', (err) => {
          console.error("Uglify error :", err.toString());
        })
        .on('end' , () => { 
          console.log("... Uglify completed.");
        }));
    }

    stream = stream.pipe(dest(this.#dest));

    if(this.#options.watch === true) {
      stream = stream.pipe(browserSync.stream());
    }

    return stream.on("end", () => {
      console.log("... JS build completed.");
    });
  }

  /**
   * This will watch file changes
   * Plan to add ENV for developement and production
   * @returns gulp watch
   */

  watchJS() {
    this.#src = config.jspaths.main + "/**/*.js";
    this.#dest = config.jspaths.maindest;
    console.log("Start JS watching ... ");

    /** Development ENV where file can be deleted on changes */

    /**  new file created will overwrite the old one */
    return watch(this.#src, { ignoreInitial: false })
      .on("change", this.compileJS.bind(this))
      .on("add", this.compileJS.bind(this))
      .on("unlink", (file) => {
       
        handler.handlerOnDeleteFile(file,config.jspaths.main,this.#dest);

      }).on('error' , (error) => {
        
        handler.handlerError(error);

      });
  }
}

module.exports = GulpJSTaskManager;
