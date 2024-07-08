"use strict";

const config = require("../../config/configLoader.js");
const { src, dest, watch } = require("gulp");
const argv = require("yargs").argv;
const path = require("path");
const sass = require("gulp-sass")(require('sass'));
const autoprefixer = require("autoprefixer");
const handler = require("./handler/Handler.js");
const postcss = require("gulp-postcss");
const PathHandler = require("./handler/PathHandler");
const InvalidArgsHandler = require("./handler/InvalidArgsHandler");


class GulpCSSTaskManager {

    /**
     * Accepts array of options
     * @param {options.src : string , options.autoInit : boolean , options.watch : boolean,
     *  options.build : boolean , options.key : string || array strings, options.autopefixer: boolean  
     *  options.numVersion : int , options.compress : boolean } options
    */

    #src;

    #autoInit;

    #baseDest;

    #dest;

    #options;

    #numVersion;

    #invalidArgsHandler;

    #pathHandler;

    constructor(options = {}) {

        /** List */
        this.#src = options.src || [];
        this.#autoInit = options.autoInit || false;
        this.#baseDest = config.csspaths.maindest;


        this.#pathHandler = new PathHandler(argv.dest,this.#baseDest);

        this.#dest = this.#pathHandler.getDestPath();
        this.#options = options;
        
        this.#options.watch = options.watch || false;
        this.#options.autoprefixer = options.autoprefixer || false;
        this.#numVersion = argv.autoprefixer || options.numVersion || 0;

        this.#invalidArgsHandler = new 
            InvalidArgsHandler(argv,config.csspaths.paths,
                ['dest', 'compress' , 'autoprefixer']);

        if(this.#numVersion === true){
            this.#numVersion = 2;
        }

        if (this.#autoInit !== false && 
                this.#invalidArgsHandler.checkInvalidArgs()) {
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
     *   Accept argument on CLI , check config.js csspaths for keys
     *   gultTasks task --option --option
    */

    #checkFlags() {
        config.csspaths.paths.forEach((item) => {
            if (argv[item.key]) {
              this.#src.push(item.path);
            }
          });
      
          if (this.#src.length === 0) {
            console.log("Option not available compiling CSS ...");
            console.log("Please check Input for valid key.");
          }
    }

    /**
     * This will set the source for the build request
     * @param {Array || string } typeBuild 
    */

    #buildSet(typeBuild) {

        let checkAvailable = false;

        if(Array.isArray(typeBuild)) {

            typeBuild.forEach(key => {
                config.csspaths.paths.forEach((item) => {
             
                    if (item.key === key) {
                      this.#src.push(item.path);
                      checkAvailable = true;
                      console.log("Type Build " , key);
                    }
                });
            });


        }else {
            config.csspaths.paths.forEach((item) => {
             
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

    async compileCssSync() {

        /** Build by key */
        if (this.#options.build === true) {
            let typeBuild = this.#options.key;
           
            console.log("... Building for :", typeBuild);

            this.#buildSet(typeBuild);

        }

        console.log("Source Path :", this.#src);
        console.log("Destination Path :", this.#dest);

        /** Input and Command Checker */
        if (this.#src.length === 0 || 
            this.#invalidArgsHandler.checkInvalidArgs() === false) 
        {
            
            console.log("No valid option provided ending process ...");
            return;
        }

        let stream = src(this.#src);

        stream = stream.pipe(sass()
            .on('error' , sass.logError)
            .on('end' , () => {
                console.log("... SASS compile completed.");
            }));

        if(argv.compress || this.#options.compress) {
            
            stream = stream.pipe(sass({outputStyle : 'compressed'})
                .on('error' , sass.logError).on('end' , () => {
                    console.log("... Compress completed.");
                }));
        }

        if(argv.autoprefixer || this.#options.autoprefixer){

            console.log("Autoprefixer value: " , this.#numVersion);
            let numVersion = 0;
            numVersion = this.#numVersion;
           
            console.log("Starting Autoprefixer with last version request of " , this.#numVersion);
            
            numVersion = await this.#isValidValue(numVersion);

            stream =  stream.pipe(postcss([autoprefixer({ overrideBrowserslist: [`last ${numVersion} versions`]  })])) 
            .on('error' , err => {
                console.log(err);
            })
            .on('end', () => {
                console.log("... Autoprefixer completed last: " , numVersion);
            });
        }

        stream = stream.pipe(dest(this.#dest));

        /** Check fo watch option */
        if(this.#options.watch === true) {
            stream = stream.pipe(browserSync.stream());
        }

        return stream.on("end", () => {
            console.log("... CSS build completed.");
        });
        
    }

    async #isValidValue(numVersion) {

        if(numVersion > 0 && numVersion <= 5) {
            console.log("Setting Value of :" , numVersion);
            numVersion = numVersion;
        }else {
            
            numVersion = config.csspaths.settings.autoprefixer;
            console.log(`Only accepts 1-${config.csspaths.settings.limit} > Invalid last version request of ` , this.#numVersion);
            console.log("Setting default on config.js ", numVersion )
        }

        return numVersion;
    }

    /**
     * This will watch the change on css and scss folders
     * @returns watch
    */

    async watchCSS() {

        
        let cssPath = config.csspaths.watch.css;
        let sassPath = config.csspaths.watch.scss;

        this.#dest = config.csspaths.maindest;

        console.log("Start CSS watching ... ");

        return watch([cssPath,sassPath], { ignoreInitial: false})
            
            .on('change', (file) => {
                
                if(file.endsWith('.css')) {
                    console.log("... Build run CSS");
                    this.#src = cssPath;
                    this.compileCssSync();
                }else if(file.endsWith('.scss')){
                    console.log("... Build run SASS");
                    this.#src = sassPath;
                    this.compileCssSync();
                }
                
                
            }).on('add' , (file) => {

                if(file.endsWith('.css')) {
                    console.log("... Build run CSS");
                    this.#src = cssPath;
                    this.compileCssSync();
                }else if(file.endsWith('.scss')){
                    console.log("... Build run SASS");
                    this.#src = sassPath;
                    this.compileCssSync();
                }

            }).on('unlink' , (file) => {

                let relativePath = "";
                let destFile = "";
                
                if(file.endsWith('.css')){
                    console.log("... On Delete > ", file);
                    relativePath = path.relative(config.csspaths.maincss, file);
                    destFile = path.join(this.#dest, relativePath);
           
                } else if(file.endsWith('.scss')) {

                    console.log("... On Delete > ", file);
                    relativePath = path.relative(config.csspaths.mainscss, file);
                    destFile = path.join(this.#dest, relativePath);
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