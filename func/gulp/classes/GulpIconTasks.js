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

        /** List */
        this.src = options.src || [];
        this.autoInit = options.autoInit || false;
        this.baseDest = Array.isArray(argv.dest) ? argv.dest : [argv.dest];
        this.dest = [] || options.dest;
        this.options = options;

        this.options.build = false || options.build; 

        if (this.autoInit !== false && this.checkInvalidArgs) {
            this.#compileSet();
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
     * This will set the source and destination for the build request.
     * In this code the max source is being check for max destination to be equal.
     * This will accept multiple source --key --key --dest x --dest y
     * @return dummy
    */

     #compileSet() {

        let max = 0;

        config.icons.paths.forEach( (item,index )=> {
            
            if (argv[item.key]) {
               
                 this.src.push(item.path);
                 max = max + index;
                
            }

        });

        console.log("Number of item in queue: ", max);

        let tempDest = "";

        this.baseDest.forEach( (destination, index)  => {

            if(this.baseDest.length > 0){

                if(destination === true || destination === undefined){
                    
                    tempDest = config.icons.maindest + config.icons.prefix; 
                    console.log("Creating default " , tempDest);

                }else{
                    
                    tempDest = config.icons.maindest + destination + config.icons.prefix; 
                    console.log("Creating destination " , tempDest);
                }
            
            }else{
                
                tempDest = config.icons.maindest + config.icons.prefix; 
                console.log("Creating Default on single item " , tempDest);
                
            }
        
            
            if(index <= max) {
            
                this.dest.push(tempDest);
            
            }else {

                return this.dest;

            }

        });
        
        console.log("Destination paths created:", this.dest);
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
     * This will compile the key on each source as the gulp dest do not handle arrays
     * Only the src on gulp handles array but not dest
     * @returns dummy
     */

    compileMultiDest() {

        if (this.src.length === 0 || this.checkInvalidArgs === false) {
            console.log("No valid option provided ending process ...");
            return "error";
        }

        if(Array.isArray(this.dest)){

            this.src.forEach((item , index)=> {
                
               
                    console.log("Source Path :", item);
                    console.log("Destination Path :", this.dest[index]);
                    
                    src(this.src, {encoding:false}).pipe(dest(this.dest[index]));
                   
                
            });

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
      
            this.#buildSet(typeBuild);
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