'use strict';

const config  = require('../../config/config.js');
const { src , dest , watch } = require('gulp');
const uglify = require('gulp-uglify');
const argv = require('yargs').argv;
const path = require('path');
const fs = require('fs-extra');

class GulpJSTaskManager 
{
    /**
     * Accepts array of options
     * @param {*} options 
     * { autoInit : bool, build : bool, key : string }
     */
    constructor(options = {}) 
    {
      
        this.src = options.src || [];
        this.baseDest = config.jspaths.maindest;
        //this.dest = argv.dest || config.jspaths.maindest;
        //this.dest = argv.dest ? `${this.baseDest}/${argv.dest}` : this.baseDest; 
        this.dest = this.getDestPath(argv.dest);
        this.options = options;
        
        if (options.autoInit !== false){
            this.checkFlags();
        }
        
    }

    /**
     * Check path supplied by --dest is not empty
     * @param {string} destArgv 
     * @returns string
     */
    getDestPath(destArgv) {

        if (destArgv === true || destArgv === undefined)  
        {
            console.log("Path Not Provided Default to: ", this.baseDest );
            return this.baseDest;
        }

        return path.join(this.baseDest, destArgv);
    }

    /**
     *  Accept argument on CLI , check config.js jspaths for keys
     *  gultTasks task --option --option
     *  
     */

    checkFlags() 
    {
        config.jspaths.paths.forEach(item => {
            if (argv[item.key]) {
                this.src.push(item.path);
            }
        });

        if(this.src.length === 0) 
        {
            console.log("Option not available compiling JS ...");
            console.log("Please check " , config.info.compileJS);
        }
    }

    /**
     * This will build the JS to the destination
     * @returns gulp task
     */

    compileJS() 
    {

        if (this.options.build === true) 
        {
            
            const typeBuild = this.options.key;
            const checkAvailable = false;
            console.log('Building invoke for...' , typeBuild);

            config.jspaths.paths.forEach(item => {
                if (item.key === typeBuild) 
                {
                    this.src.push(item.path);
                    checkAvailable = true;
                }
            });

            if(checkAvailable === false) 
            {
                console.log(typeBuild , ".. not available please check config for available keys");
            }
        }

        console.log("Source Path :" , this.src);
        console.log("Destination Path :" , this.dest);

        if (this.src.length === 0 ) 
        {
            console.log("No valid option provided.");
            return;
        }

        let stream = src(this.src);

        if(argv.uglify) {
            console.log("init ... uglify ...")
            stream = stream.pipe(uglify()).on('error', (err) => {
                console.error("Uglify Error :", err.toString());
            });
        }

        return stream.pipe(dest(this.dest)).on('end', () => {
            console.log("... Build Completed");
        });
    }

    /**
     * This will watch file changes
     * Plan to add ENV for developement and production
     * @returns gulp watch
     */

    watchJS()
    {
        this.src = config.jspaths.main + '/**/*.js';
        this.dest = config.jspaths.maindest;
        console.log("Start watching ... ");

       /** Development ENV where file can be deleted on changes */
        
       /**  new file created will overwrite the old one */
        return watch(this.src, { ignoreInitial: false})
        .on('change', this.compileJS.bind(this))
        .on('add', this.compileJS.bind(this))
        .on('unlink', (file) => {
            console.log("On Delete : " , file );
            const relativePath = path.relative(config.jspaths.main, file);
            const destFile = path.join(this.dest, relativePath);
           
            try {
                fs.remove(destFile);
                console.log("Removed File Success , Path" , destFile);
            } catch (err) {
                console.error("Error removing file: ", err);
            }
        });
        
    }
}

module.exports = GulpJSTaskManager;