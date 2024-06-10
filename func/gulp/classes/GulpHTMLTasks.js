'use strict';

const config = require('../../config/config.js');
const { src, dest, watch, series } = require('gulp');
const panini = require('panini');
const browserSync = require('browser-sync').create();
const path = require('path');
const fs = require('fs-extra');

class GulpHTMLTasks {

    constructor(options = {}) {

        this.src = options.src || config.htmlpaths.panini.src;
        this.dest = options.dest || config.htmlpaths.panini.dest;
       

        this.pages = path.join(this.src, 'pages/**/*.{html,hbs,handlebars}');
        this.partials = path.join(this.src, 'partials/');
        this.layouts = path.join(this.src, 'layouts/');
        this.helpers = path.join(this.src, 'helpers/');
        this.data = path.join(this.src, 'data/');
        
        this.options = options;
    
    }

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
        
        if(this.options.watch === true) {
            stream = stream.pipe(browserSync.stream());
        }
       
        return  stream.on('end' , () => {
            console.log("... HTML build completed.");
           
        });
    }

    resetPanini(cb) {
        console.log("... Resetting Panini cache.");
        panini.refresh();
        cb();
    }

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

                        const relativePath = path.relative(path.join(this.src, 'pages'), file);
                        const destFile = path.join(this.dest, relativePath);
                        
                        try {
                            fs.remove(destFile);
                            console.log("Removed File Successfully, Path", destFile);
                        } catch (err) {
                            console.error("Error removing file:", err);
                        }
                    }else {
                        console.log(".... On Delete: > ", file);
                    }

                });

    }

}

//const gulpHtmlTasks = new GulpHTMLTasks();
//Object.freeze(gulpHtmlTasks);

module.exports = GulpHTMLTasks;