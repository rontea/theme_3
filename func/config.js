/** 
    Configuration files
*/

'use strict';

module.exports = {
    csspaths : {

        bootstrap : "node_modules/bootstrap/scss/bootstrap.scss",
        bootstrapicon : "node_modules/bootstrap-icons/font/bootstrap-icons.scss",
        styles : "src/scss/**/*.scss",
        stylesinc : "src/css/**/*.css",
        stylesmin : "src/scss/**/*.scss",
        bulma : "node_modules/bulma/bulma.sass",
        prism : "node_modules/prismjs/themes/prism.min.css",
        fontawesome : "node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss",
        
        builds : {
            dest : "build/css/",
            destinc : "build/css/inc"
        }
    },

    jspaths : {
        bootstrap: "node_modules/bootstrap/dist/js/bootstrap.min.js",
        popper : "node_modules/@popperjs/core/dist/umd/popper.min.js",
        tether: "node_modules/tether/dist/js/tether.min.js",
        jquery: "node_modules/jquery/dist/jquery.min.js",
        fontawesome: "node_modules/@fortawesome/fontawesome-free/js/all.min.js",
        main: "src/js",
        maindest: "build/js"
    },

    jsdest : "build/js/inc",

    builds : {
        paniniBuild : "./build"
    },

    icons : {
        fontawesome : {
            webfonts: "node_modules/@fortawesome/fontawesome-free/webfonts/**/*",
            build: "build/fontawesome/webfonts"
        },
        bootstrap: {
            webfonts:"node_modules/bootstrap-icons/font/fonts/**",
            build: "build/bootstrap/webfonts"
        } 
    }
}