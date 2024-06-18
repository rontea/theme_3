"use strict";

const config = require("../../config/config.js");
const { src, dest, watch } = require("gulp");
const argv = require("yargs").argv;
const path = require("path");
const sass = require("gulp-sass")(require('sass'));
const autoprefixer = require("autoprefixer");
const handler = require("../../gulp/classes/Handler.js");


class GulpCSSTaskManager {

    /**
     * Accepts array of options
     * @param {options.src : string , options.autoInit : boolean , options.watch : boolean,
     *  options.build : boolean , options.key : string || array strings, options.autopefixer: boolean  
     *  options.numVersion : int , options.compress : boolean } options
     */
    constructor(options = {}) {

        /** List */

        this.checkInvalidArgs = this.checkInvalidArgs();

        this.src = options.src || [];
        this.autoInit = options.autoInit || false;
        this.baseDest = config.csspaths.maindest;
        this.dest = this.getDestPath(argv.dest);
        this.options = options;
        
        this.options.watch = this.options.watch || false;
        this.options.autoprefixer = this.options.autoprefixer || false;

        if (this.autoInit !== false && this.checkInvalidArgs) {
            this.checkFlags();
        }

    }

    /**
    * This will return all options
    * @returns array 
    */

    getOptions() {
        return this.options;
    }


    /**
     * Check path supplied by --dest is not empty and not a number value
     * @param {string} destArgv 
     * @returns string
     */

    getDestPath(destArgv) {
        if (destArgv === true || destArgv === undefined || typeof destArgv !== 'string') {
            
            if(typeof destArgv !== 'string') {
                console.log("Path not a valid string , default to: ", this.baseDest);
            }else {
                console.log("Path not provided default to: ", this.baseDest);
            }
            
            return this.baseDest;
          
        }
      
        return path.join(this.baseDest, destArgv);
    }
    /**
     *   Accept argument on CLI , check config.js csspaths for keys
     *   gultTasks task --option --option
     */

    checkFlags() {
        config.csspaths.paths.forEach((item) => {
            if (argv[item.key]) {
              this.src.push(item.path);
            }
          });
      
          if (this.src.length === 0) {
            console.log("Option not available compiling CSS ...");
            console.log("Please check Input for valid key.");
          }
    }
    /**
     * Check if the commands are correct
     * @returns boolean
     */
    checkInvalidArgs() {

        const validKeys = config.csspaths.paths.map(item => item.key).concat(['dest', 'compress' , 'autoprefixer']);
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
     * @param {Array || string } typeBuild 
     */

    buildSet(typeBuild) {

        let checkAvailable = false;

        if(Array.isArray(typeBuild)) {

            typeBuild.forEach(key => {
                config.csspaths.paths.forEach((item) => {
             
                    if (item.key === key) {
                      this.src.push(item.path);
                      checkAvailable = true;
                      console.log("Type Build " , key);
                    }
                });
            });


        }else {
            config.csspaths.paths.forEach((item) => {
             
                if (item.key === typeBuild) {
                  this.src.push(item.path);
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

    compileCSS() {

        /** Build by key */
        if (this.options.build === true) {
            let typeBuild = this.options.key;
           
            console.log("... Building for :", typeBuild);

            this.buildSet(typeBuild);

        }

        console.log("Source Path :", this.src);
        console.log("Destination Path :", this.dest);

        /** Input and Command Checker */
        if (this.src.length === 0 || this.checkInvalidArgs === false) {
            console.log("No valid option provided ending process ...");
            return;
        }

        let stream = src(this.src);

        stream = stream.pipe(sass()
            .on('error' , sass.logError)
            .on('end' , () => {
                console.log("... SASS compile completed.");
            }));

        if(argv.compress || this.options.compress) {
            
            stream = stream.pipe(sass({outputStyle : 'compressed'})
                .on('error' , sass.logError).on('end' , () => {
                    console.log("... Compress completed.");
                }));
        }

        if(argv.autoprefixer || this.options.autoprefixer){

            console.log(argv.autoprefixer);
            let numVersion = argv.autoprefixer || this.options.numVersion;
            let temp = numVersion;
            console.log("Starting Autoprefixer with last version request of " , temp);

            if(numVersion > 0 && numVersion <= 5 ) {
                numVersion = numVersion;
            }else {
                numVersion = config.csspaths.settings.autoprefixer;
                console.log("Only accepts 1-5 > Invalid last version request of " , temp);
                console.log("Setting default on config.js ", numVersion )
            }

            stream = stream.pipe(sass([autoprefixer({ overrideBrowserslist: [`last ${numVersion} versions`]  })])
            .on('error' , sass.logError)
            .on('end', () => {
                console.log("... Autoprefixer completed last: " , numVersion);
            }));
        }

        stream = stream.pipe(dest(this.dest));

        /** Check fo watch option */
        if(this.options.watch === true) {
            stream = stream.pipe(browserSync.stream());
        }

        return stream.on("end", () => {
            console.log("... CSS build completed.");
        });
        
    }

    /**
     * This will watch the change on css and scss folders
     * @returns watch
     */

    watchCSS() {

        
        let cssPath = config.csspaths.watch.css;
        let sassPath = config.csspaths.watch.scss;

        this.dest = config.csspaths.maindest;

        console.log("Start CSS watching ... ");

        return watch([cssPath,sassPath], { ignoreInitial: false})
            
            .on('change', (file) => {
                
                if(file.endsWith('.css')) {
                    console.log("... Build run CSS");
                    this.src = cssPath;
                    this.compileCSS();
                }else if(file.endsWith('.scss')){
                    console.log("... Build run SASS");
                    this.src = sassPath;
                    this.compileCSS();
                }
                
                
            }).on('add' , (file) => {

                if(file.endsWith('.css')) {
                    console.log("... Build run CSS");
                    this.src = cssPath;
                    this.compileCSS();
                }else if(file.endsWith('.scss')){
                    console.log("... Build run SASS");
                    this.src = sassPath;
                    this.compileCSS();
                }

            }).on('unlink' , (file) => {

                let relativePath = "";
                let destFile = "";
                
                if(file.endsWith('.css')){
                    console.log("... On Delete > ", file);
                    relativePath = path.relative(config.csspaths.maincss, file);
                    destFile = path.join(this.dest, relativePath);
           
                } else if(file.endsWith('.scss')) {

                    console.log("... On Delete > ", file);
                    relativePath = path.relative(config.csspaths.mainscss, file);
                    destFile = path.join(this.dest, relativePath);
                    destFile = destFile.replace(/\.scss$/, '.css');
          
                }
                
                handler.handlerSetOnDeleteFile(destFile);

            })
            .on('error' , (error) => {
        
                handler.handlerError(error);
        
            });
    }

}

module.exports = GulpCSSTaskManager;