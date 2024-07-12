"use strict";

const config = require("../../config/configLoader.js");
const { argv } = require("yargs");
const { src, dest } = require("gulp");
const InvalidArgsHandler = require("./handler/InvalidArgsHandler");
const PathHandler = require("./handler/PathHandler");


class GulpIconTasks {

    /**
     * Accepts array of options
     * @param {options.src : string, options.dest : string, 
     * options.build: boolean , options.key : string} options 
    */

    #src;

    #autoInit;

    #baseDest;

    #dest;

    #options;

    #invalidArgsHandler;

    #defaultDest;

    #pathHandler;

    #prefixDest;

    constructor(options = {}){

        /** List */
        this.#options = options;

        this.#src = options.src || [];
        this.#autoInit = options.autoInit || false;
        this.#baseDest = Array.isArray(argv.dest) ? argv.dest : [argv.dest];
        this.#dest = [] || options.dest;
        this.#options.build = false || options.build;

        this.#defaultDest = config.icons.maindest;
  
        this.#pathHandler = new PathHandler('',this.#defaultDest);

        this.#invalidArgsHandler = new 
        InvalidArgsHandler(argv, config.icons.paths,
            ['dest']);

        if (this.#autoInit !== false && this.#invalidArgsHandler.checkInvalidArgs()) {
            this.#prefixDest = config.icons.prefix;
            this.#compileSet();
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
     * This will set the source and destination for the build request.
     * In this code the max source is being check for max destination to be equal.
     * This will accept multiple source --key --key --dest x --dest y
     * @return dummy
    */

 
    /** still working on 1 on 1 mapping */
     #compileSet() {
       
        config.icons.paths.forEach( (item)=> {
            
            if (argv[item.key]) {
                /** Get argv index */
                let argvArray = Object.keys(argv).map(key => ({ key, value: argv[key]}));
                let index = argvArray.findIndex(argv => argv.key === item.key);
                this.#src[index] = item.path; 
            }
              
        });
        /** Clean array empty index */
        this.#src = this.#src.filter(item => !(Array.isArray(item) && item.length === 0));
        console.log("Destination Mapping for each :" , this.#src);
    
    }

    /**
     * This will set the source for the build request
     * @param {Array || string } 
    */

    #buildSet(srcTypeBuild) {
        
        let checkAvailable = false;
        let tempDest = "";
        if(Array.isArray(srcTypeBuild)) {

            srcTypeBuild.forEach(key => {
                config.icons.paths.forEach((item) => {
            
                    if (item.key === key) {
                        this.#src.push(item.path);
                        tempDest = config.icons.maindest + config.icons.prefix;
                        this.#dest.push(tempDest);
                        checkAvailable = true;
                        console.log("Type Build " , key);
                    }
                });
            });

            
        }else {
            config.icons.paths.forEach((item) => {
            
                if (item.key === srcTypeBuild) {
                    this.#src.push(item.path);
                    tempDest = config.icons.maindest + config.icons.prefix;
                    this.#dest.push(tempDest);
                    checkAvailable = true;
                    console.log("Type Build " , srcTypeBuild);
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
     * This will compile the key on each source as the gulp dest do not handle arrays
     * Only the src on gulp handles array but not dest
     * @returns dummy
     */

    compileMultiDest() {

        if (this.#src.length === 0 ||  this.#invalidArgsHandler.checkInvalidArgs() === false) {
            console.log("No valid option provided ending process ...");
            return "error";
        }

        let tempDest = "";

        if(Array.isArray(this.#dest)){

            this.#src.forEach((item , index)=> {
                
                
                this.#pathHandler.setDestArgv(this.#baseDest[index]);
                tempDest = this.#pathHandler.getDestPath() +  this.#prefixDest;
               
                console.log("Source Path :", item);
                console.log("Destination Path :", tempDest);
                    
                src(item, {encoding:false}).pipe(dest(tempDest))
                .on('end' , () => {
                    console.log("... Icons build completed." , index);
                }).on('error' , (err) => {
                    console.log("Error on Icon move " , err);
                });
                   
            });

        }

    }

    /**
     * This will build the Icon files to the destination
     * @returns gulp task
    */


    compileIconSets() {

        if (this.#options.build === true) {
            
            let typeBuild = this.#options.key;
            
            console.log("Building invoke for...", typeBuild);
      
            this.#buildSet(typeBuild);
        }

        console.log("Source Path :", this.#src);
        console.log("Destination Path :", this.#dest);

            /** Input and Command Checker */
        if (this.#src.length === 0 || this.checkInvalidArgs === false) {
            console.log("No valid option provided ending process ...");
            return;
        }


        let stream = src(this.#src, {encoding:false});

        stream = stream.pipe(dest(this.#dest));

        return stream.on('end' , () => {
            console.log("... Icons build completed.");
        }).on('error', (err) => {
            console.log(err);
        });
    }
}

module.exports = GulpIconTasks;