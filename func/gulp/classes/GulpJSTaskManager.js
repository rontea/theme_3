'use strict';

const config = require('../../config/config.js');
const { src , dest , watch } = require('gulp');
const uglify = require('gulp-uglify');
const argv = require('yargs').argv;
const path = require('path');
const fs = require('fs-extra');

class GulpJSTaskManager 
{

    constructor(options = {}) 
    {
      
        this.src = options.src || [];
        this.baseDest = config.jspaths.maindest;
        //this.dest = argv.dest || config.jspaths.maindest;
        //this.dest = argv.dest ? `${this.baseDest}/${argv.dest}` : this.baseDest; 
        this.dest = this.getDestPath(argv.dest);
        this.checkFlags();
        
    }

    getDestPath(destArgv) {

        if (destArgv === true || destArgv === undefined)  
        {
            console.log("Path Not Provided Default to: ", this.baseDest );
            return this.baseDest;
        }

        return `${this.baseDest}/${destArgv}`;
    }

    checkFlags() 
    {

        if(argv.js) 
        {
            this.src.push(config.jspaths.main + '/**/*.js');
        }
        if(argv.jquery)
        {
            this.src.push(config.jspaths.jquery);
        }
        if(argv.popper)
        {
            this.src.push(config.jspaths.popper);
        }
        if(argv.tether)
        {
            this.src.push(config.jspaths.tether);
        }
        if(argv.bootstrap)
        {
            this.src.push(config.jspaths.bootstrap);
        }
        if(argv.fontawesome)
        {
            this.src.push(config.jspaths.fontawesome);
        }
        if(this.src.length === 0) 
        {
            console.log("Option not available compiling JS ...");
            console.log("Please check " , config.info.compileJS);
        }
    }

    compileJS(cb) 
    {
        console.log("Source Path :" , this.src);
        console.log("Destination Path :" , this.dest);

        if (this.src.length === 0) {
            console.log("No valid option provided.");
            console.log("Please check " , config.info.compileJS);
            cb();
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

    watchJS() 
    {
        this.src = config.jspaths.main + '/**/*.js';
        this.dest = config.jspaths.maindest;
        console.log("Start watching ... ");

       /** Working on this */
        
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