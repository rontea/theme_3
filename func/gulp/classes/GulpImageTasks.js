'use strict'

const config = require("../../config/config.js");
const { src, dest, watch } = require("gulp");
const browserSync = require('browser-sync').create();
const path = require("path");
const fs = require("fs-extra");

class GulpImageTasks {
    /**
     * Accepts array of options
     * @param { options.src: string , options.dest : string , options.watch : boolean} options 
     */
    constructor(options = {}){

        /** List */
        this.src = options.src || config.images.main;
        this.dest = options.dest || config.images.maindest;

        this.options = options;
        this.options.watch =  false || this.options.watch;
    }

    /**
     * This will return all options
     * @returns array
     */

    getOptions() {
        return this.options;
    }

    /**
     * This will build the Images to the destination
     * @returns gulp task
     */

    compileImages() {

        console.log("Source Path :", this.src);
        console.log("Destination Path :", this.dest);
        
        let stream = src(this.src);

        stream = stream.pipe(dest(this.dest));

        if(this.options.watch) {
            stream = stream.pipe(browserSync.stream());
        }

        return stream.on("end", () => {
            console.log("... Image build completed.");
        });

    }

    /**
     * This will watch file changes
     * @returns watch
     */

    watchImages() {

        console.log("Start Images watching ... ");

        return watch(this.src)
        .on('change' , this.compileImages.bind(this))
        .on('add' , this.compileImages.bind(this))
        .on('unlink' , (file) => {
            console.log("... On Delete > ", file);
            const relativePath = path.relative(config.images.mainsrc, file);
            const destFile = path.join(this.dest, relativePath);

            try {
                fs.remove(destFile);
                console.log("Removed File Success , Path", destFile);
              } catch (err) {
                console.error("Error removing file: ", err);
            }

        });

    }

}

module.exports = GulpImageTasks;