'use strict';

const config = require('../../config/config.js');
const { src, dest, watch, series } = require('gulp');
const panini = require('panini');
const browserSync = require('browser-sync').create();
const path = require('path');
const fs = require('fs-extra');

class GulpHTMLTasks {

    /**
     * Accepts array of options
     * @param {options.src : string, options.dest : string, options.watch: boolean} options 
     */
    constructor(options = {}) {

        /** List */

        this.src = options.src || config.htmlpaths.panini.src;
        this.dest = options.dest || config.htmlpaths.panini.dest;
       
        /** paths */
        this.pages = path.join(this.src, config.htmlpaths.panini.pages);
        this.partials = path.join(this.src, config.htmlpaths.panini.partials);
        this.layouts = path.join(this.src, config.htmlpaths.panini.layouts);
        this.helpers = path.join(this.src, '');
        this.data = path.join(this.src, '');
        
        this.options = options;
        this.options.watch = this.options.watch || false;
    }

    /**
    * This will return all options
    * @returns array 
    */

    getOptions() {
        return this.options;
    }

    /**
     * This will build the HTML of Panini
     * @returns gulp tasks
     */
    compileHtml(){
        console.log('Compiling HTML...');
        console.log(this.src);
        console.log(this.dest);

        let stream = src(this.pages);

        stream = stream.pipe(
            panini({
            root: this.pages,
            layouts: this.layouts,
            partials: this.partials,
            helpers: this.helpers,
            data: this.data
        }));

        stream = stream.pipe(dest(this.dest));
        /** Check fo watch option */
        if(this.options.watch === true) {
            stream = stream.pipe(browserSync.stream());
        }
       
        return  stream.on('end' , () => {
            console.log("... HTML build completed.");
           
        });
    }
    /**
     * This will reset paninin caching
     * @param {*} cb 
     */
    resetPanini(cb) {
        console.log("... Resetting Panini cache.");
        panini.refresh();
        cb();
    }

    /**
     * This will watch the change on HTML folder for Panini
     * @returns watch
     */

    watchHtml() {

        console.log("... Start watching HTML.")

        browserSync.init({
            server: {
                baseDir: this.dest
            }
        });

        return watch([this.pages, this.partials , this.layouts , this.helpers, this.data],
                series(this.resetPanini.bind(this) , this.compileHtml.bind(this)))
                .on('unlink' , (file) => {
                    
                    if(file.startsWith(path.join(this.src, 'pages'))){
                        console.log("... On Delete: > ", file);
                        /** Make sure it only delete on pages and on join remove text 'pages'*/
                        const relativePath = path.relative(path.join(this.src, 'pages'), file);
                        const destFile = path.join(this.dest, relativePath);
                        
                        try {
                            fs.remove(destFile);
                            console.log("Removed File Successfully, Path", destFile);
                        } catch (err) {
                            console.error("Error removing file:", err);
                        }
                    }else {
                        console.log(".... On Delete source only: > ", file);
                    }

                });

    }

}

//const gulpHtmlTasks = new GulpHTMLTasks();
//Object.freeze(gulpHtmlTasks);

module.exports = GulpHTMLTasks;