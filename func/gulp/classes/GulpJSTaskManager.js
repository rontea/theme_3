"use strict";

const config = require("../../config/configLoader");
const { src, dest, watch } = require("gulp");
const uglify = require("gulp-uglify");
const argv = require("yargs").argv;
const browserSync = require('browser-sync').create();
const path = require("path");
const handler = require("./handler/Handler");
const PathHandler = require("./handler/PathHandler");
const InvalidArgsHandler = require("./handler/InvalidArgsHandler");

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

  #invalidArgsHandler;

  constructor(options = {}) {

    /** List */

    this.#src = options.src || [];
    this.#autoInit = options.autoInit || false;
    this.#baseDest = config.jspaths.maindest;
    //this.#dest = argv.dest || config.jspaths.maindest;
    //this.#dest = argv.dest ? `${this.baseDest}/${argv.dest}` : this.#baseDest;
    
    const pathHandler = new PathHandler(argv.dest,this.#baseDest);
    
    this.#dest = pathHandler.getDestPath();
    this.#options = options;

    this.#options.watch = options.watch || false;

    this.#invalidArgsHandler = new 
      InvalidArgsHandler(argv,config.jspaths.paths,
        ['dest', 'uglify']);

    if (this.#autoInit !== false && this.#invalidArgsHandler.checkInvalidArgs()) {
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

  getHelp() {
    
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
      console.log("Option not available");
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

  async compileJsSync() {
    
    if (this.#options.build === true) {
      let typeBuild = this.#options.key;
      console.log("Building invoke for...", typeBuild);

      this.#buildSet(typeBuild);
    }

    console.log("Source Path :", this.#src);
    console.log("Destination Path :", this.#dest);

    /** Input and Command Checker */
    if (this.#src.length === 0 || this.#invalidArgsHandler.checkInvalidArgs() === false) {
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
    }).on('error' , (err) => {
      console.log("Error on JS move " , err);
    });
  }

  /**
   * This will watch file changes
   * Plan to add ENV for developement and production
   * @returns gulp watch
   */

  watchJsSync() {
    this.#src = config.jspaths.main + "/**/*.js";
    this.#dest = config.jspaths.maindest;
    console.log("Start JS watching ... ");

    /** Development ENV where file can be deleted on changes */

    /**  new file created will overwrite the old one */
    return watch(this.#src, { ignoreInitial: false })
      .on("change", this.compileJsSync.bind(this))
      .on("add", this.compileJsSync.bind(this))
      .on("unlink", (file) => {
       
        handler.handlerOnDeleteFile(file,config.jspaths.main,this.#dest);

      }).on('error' , (error) => {
        
        handler.handlerError(error);

      });
  }
}

module.exports = GulpJSTaskManager;
