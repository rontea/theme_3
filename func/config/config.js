/** 
    Configuration files
*/

'use strict';

const { production } = require("gulp-environments");

const env = process.env.NODE_ENV || 'development';

const config = {
        development : {
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
                main: "src/js",
                maindest: "build/js",
                paths: [
                    { key: 'js' , path: 'src/js/**/*.js'  },
                    { key: 'jquery' , path: 'node_modules/jquery/dist/jquery.min.js' },
                    { key: 'popper' , path: 'node_modules/@popperjs/core/dist/umd/popper.min.js'},
                    { key: 'tether' , path: 'node_modules/tether/dist/js/tether.min.js'},
                    { key: 'bootstrap', path: 'node_modules/bootstrap/dist/js/bootstrap.min.js'},
                    { key: 'fontawesome', path: 'node_modules/@fortawesome/fontawesome-free/js/all.min.js' }
                ],
                
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
            },
            
            info : {
                compileJS : "$gulp compileJS --options[] --uglify --dest url",
            } 
        }
        
};

module.exports = config[env];