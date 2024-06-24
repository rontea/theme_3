"use strict";

const config = require("../../config/config.js");
const { argv } = require("yargs");
const { src, dest } = require("gulp");


class GulpIconTasks {

    /**
     * Accepts array of options
     * @param {options.src : string, options.dest : string, 
     * options.build: boolean , options.key : string} options 
    */

    constructor(options = {}){

        this.src = options.src || [];
        this.autoInit = options.autoInit || false;
        this.baseDest = argv.dest || config.icons.maindest;
        this.dest = options.dest || [];

        this.options = options;

        if (this.autoInit !== false && this.checkInvalidArgs()) {
            this.compileSet();
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
     * This will set the source for the build request
     * @param {Array || string } 
    */

    buildSet(srcTypeBuild) {
        
        let checkAvailable = false;
        let tempDest = "";
        if(Array.isArray(srcTypeBuild)) {

            srcTypeBuild.forEach(key => {
                config.icons.paths.forEach((item) => {
            
                    if (item.key === key) {
                        this.src.push(item.path);
                        tempDest = config.icons.maindest + config.icons.prefix;
                        this.dest.push(tempDest);
                        checkAvailable = true;
                        console.log("Type Build " , key);
                    }
                });
            });

            
        }else {
            config.icons.paths.forEach((item) => {
            
                if (item.key === srcTypeBuild) {
                    this.src.push(item.path);
                    tempDest = config.icons.maindest + config.icons.prefix;
                    this.dest.push(tempDest);
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
     * This will set the source for the build request
     * @param {Array || string } 
    */

    compileSet() {

        if(Array.isArray(this.baseDest)){
            
            this.baseDest.forEach(destination => {

                let tempDest = "";

                if(destination === true) {

                    tempDest = config.icons.maindest + prefix;
                    console.log("Destination is blank , this has been set" , 
                        tempDest);
                }else {
                    
                    tempDest = config.icons.maindest + destination;
                }

                this.dest.push(tempDest);

            });

            this.build = true;

        }else {
            
            this.build = false;

        }
    }

  /**
   *  Accept argument on CLI , check config.js iconpaths for keys
   *  gultTasks task --option --option
   *
   */
    checkFlags() {

        config.icons.paths.forEach((item) => {
            if(argv[item.key]) {
                
              this.src.push(item.path);

              if(!this.build) {
                let tempDest = this.baseDest + item.key + config.icons.prefix;
                this.dest.push(tempDest);
              }
              
            }
        });
    }

    /**
     * Check if the commands are correct
     * @returns boolean
    */

    checkInvalidArgs() {

        const validKeys = config.icons.paths.map(item => item.key).concat(['dest']);
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
     * This will build the Icon files to the destination
     * @returns gulp task
    */


    compileIconSets() {

        if (this.options.build === true) {
            
            let typeBuild = this.options.key;
            
            console.log("Building invoke for...", typeBuild);
      
            this.buildSet(typeBuild);
        }

        console.log("Source Path :", this.src);
        console.log("Destination Path :", this.dest);

            /** Input and Command Checker */
        if (this.src.length === 0 || this.checkInvalidArgs === false) {
            console.log("No valid option provided ending process ...");
            return;
        }

        let stream = src(this.src, {encoding:false});

        stream = stream.pipe(dest(this.dest));

        return stream.on('end' , () => {
            console.log("... Build completed.");
        }).on('error', (error) => {
            console.log(error);
        });
    }
}

module.exports = GulpIconTasks;