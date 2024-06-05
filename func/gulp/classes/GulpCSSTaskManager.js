"use strict";

const config = require("../../config/config.js");
const { src, dest, watch } = require("gulp");
const argv = require("yargs").argv;
const path = require("path");
const sass = require("gulp-sass")(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const { check } = require("yargs");
const fs = require("fs-extra");


class GulpCSSTaskManager {

    /**
     * Accepts array of options
     * @param {*} options 
     */
    constructor(options = {}) {

        /** List */

        this.checkInvalidArgs = this.checkInvalidArgs();

        this.src = options.src || [];
        this.autoInit = options.autoInit || false;
        this.baseDest = config.csspaths.maindest;
        this.dest = this.getDestPath(argv.dest);
        this.options = options;
        
        if (this.autoInit !== false && this.checkInvalidArgs) {
            this.checkFlags();
        }
        
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
     * This will build the JS to the destination
     * @returns gulp task
     */

    compileCSS() {

        if (this.options.build === true) {
            let typeBuild = this.options.key;
            let checkAvailable = false;
            console.log("... Building for :", typeBuild);

            config.csspaths.paths.forEach((item) => {
                if (item.key === typeBuild) {
                  this.src.push(item.path);
                  checkAvailable = true;
                }
            });

            if (checkAvailable === false) {
                console.log(
                  typeBuild,
                  "Not available please check config for available keys ..."
                );
            }
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

        if(argv.compress) {
            
            stream = stream.pipe(sass({outputStyle : 'compressed'})
                .on('error' , sass.logError).on('end' , () => {
                    console.log("... Compress completed.");
                }));
        }

        if(argv.autoprefixer){

            let numVersion = argv.autoprefixer;

            if(numVersion > 0 && numVersion <= 5) {
                numVersion = numVersion;
            }else {
                numVersion = config.csspaths.settings.autoprefixer;
            }

            stream = stream.pipe(sass([autoprefixer({ overrideBrowserslist: [`last ${numVersion} versions`]  })])
            .on('error' , sass.logError)
            .on('end', () => {
                console.log("... Autoprefixer completed last: " , numVersion);
            }));
        }

        return stream.pipe(dest(this.dest)).on("end", () => {
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
                    console.log("On Delete : ", file);
                    relativePath = path.relative(config.csspaths.maincss, file);
                    destFile = path.join(this.dest, relativePath);
           
                } else if(file.endsWith('.scss')) {

                    console.log("On Delete : ", file);
                    relativePath = path.relative(config.csspaths.mainscss, file);
                    destFile = path.join(this.dest, relativePath);
                    destFile = destFile.replace(/\.scss$/, '.css');
          
                }
                
                try {
                    fs.remove(destFile);
                    console.log("Removed File Success , Path", destFile);
                } catch (err) {
                    console.error("Error removing file: ", err);
                }


            }).on('cycleEnd' , () => {
                console.log("... Cycle Complete ...");
            });

    }

}

module.exports = GulpCSSTaskManager;