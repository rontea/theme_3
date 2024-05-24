'use strict';

const {src , dest} = require('gulp');
const environments = require('gulp-environments');
const uglify = require('gulp-uglify');
const config = require('../config.js');


/**
 * # This command runs the 'task' task using Gulp in production mode.
 * $ gulp task --production
 */

let production = environments.production;

/**
 * This function will compile JavaScript files 
 * located in the specified directory 
 * (config.jspaths.main) and its subdirectories. 
 */

function compileJS() {

    return src(config.jspaths.main + '/**/*.js')
    .pipe(production(uglify()))
    .pipe(dest(config.jspaths.maindest));
}

/**
 * This function will compile a specific JavaScript
 * file (jQuery) located at config.jspaths.jquery.
 */

function compileJquery() {

    return src(config.jspaths.jquery)
    .pipe(production(uglify()))
    .pipe(dest(config.jsdest));
    
}
/**
 *  This function will compile a specific JavaScript 
 * file (Popper) located at config.jspaths.popper.
 */

function compilePopper() {

    return src(config.jspaths.popper)
    .pipe(production(uglify()))
    .pipe(dest(config.jsdest));
    
}

/**
 * This function will compile a specific JavaScript 
 * file (Tether) located at config.jspaths.tether. 
 */

function compileTether() {

    return src(config.jspaths.tether)
    .pipe(production(uglify()))
    .pipe(dest(config.jsdest));
    
}

/**
* This function will compile a specific JavaScript file 
* (Bootstrap) located at config.jspaths.bootstrap. 
*/

function compileBSJS () {

    return src(config.jspaths.bootstrap)
    .pipe(production(uglify()))
    .pipe(dest(config.jsdest))

}

/**
 * This function will compile a specific JavaScript
 * file (Font Awesome) located at config.jspaths.fontawesome.
 */

function fontawesomeJS () {
    
    return src(config.jspaths.fontawesome)
    .pipe(production(uglify()))
    .pipe(dest(config.jsdest));
}

module.exports = {compileJS , compileJquery, compilePopper
    , compileTether , compileBSJS , fontawesomeJS};