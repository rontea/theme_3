'use strict'

const config = require("../../config/configLoader.js");
const { src, dest, watch } = require("gulp");
const browserSync = require('browser-sync').create();
const handler = require("./handler/Handler.js");


class GulpImageTasks {
    /**
     * Accepts array of options
     * @param { options.src: string , options.dest : string , options.watch : boolean} options 
    */

    #src;

    #dest;

    #options;

    constructor(options = {}){

        /** List */
        this.#src = options.src || config.images.main;
        this.#dest = options.dest || config.images.maindest;

        this.#options = options;
        this.#options.watch =  false || options.watch;
    }

    /**
     * This will return all options
     * @returns array
    */

    getOptions() {
        return this.#options;
    }

    /**
     * This will build the Images to the destination
     * @returns gulp task
    */

    async compileImagesSync() {

        console.log("Source Path :", this.#src);
        console.log("Destination Path :", this.#dest);
        /** Encoding : false fixed corrupt images */        
        let stream = src(this.#src , {encoding:false});

        stream = stream.pipe(dest(this.#dest));

        if(this.#options.watch) {
            stream = stream.pipe(browserSync.stream());
        }

        return stream.on("end", () => {
            console.log("... Image build completed.");
        }).on('error' , (err) => {
            console.log("Error on Image Tasks " , err);
        });

    }

    /**
     * This will watch file changes
     * @returns watch
    */

    async watchImagesSync() {

        console.log("Start Images watching ... ");

        return watch(this.#src , { ignoreInitial: false})
        .on('change' , this.compileImagesSync.bind(this))
        .on('add' , this.compileImagesSync.bind(this))
        .on('addDir' , (dir) => {
           handler.handlerOnDirAdd(dir,config.images.mainsrc,this.#dest);
        })
        .on('unlink' , (file) => {
            handler.handlerOnDeleteFile(file,config.images.mainsrc,this.#dest);
        })
        .on('unlinkDir' , (dir) => {
            console.log("... On Dir Delete > ", dir);
       
        })
        .on('error' , (error) => {
           handler.handlerError(error);
        });

    }

}

module.exports = GulpImageTasks;