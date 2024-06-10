
'use strict';

const { parallel } = require('gulp');
const hello = require('./func/gulp/hello.js');
const { clean } = require('./func/gulp/utils.js');
const GulpJSTaskManager = require('./func/gulp/classes/GulpJSTaskManager.js');
const GulpCSSTaskManager = require('./func/gulp/classes/GulpCSSTaskManager.js');
const GulpHTMLTasks = require('./func/gulp/classes/GulpHTMLTasks.js')


/** Tasks */
exports.default = hello;

/** Util Tasks */
exports.clean = clean;

/** JS Tasks */
exports.compileJS = () => {
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: true });
    return gulpJSTaskManager.compileJS();
}

/** JS Watch */
exports.watchJS = () => { 
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: false });
    return gulpJSTaskManager.watchJS();
}

/** JS Build Task */
exports.buildJS = () => {
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: false , build: true, key: 'js'});
    return gulpJSTaskManager.compileJS();
}

/** CSS Tasks */
exports.compileCSS = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ autoInit: true });
    return gulpCSSTaskManager.compileCSS();
}

/** CSS Build Task */
exports.buildCSS = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ autoInit: false, build: true, key: 'css' });
    return gulpCSSTaskManager.compileCSS();
}

/** CSS and SCSS Watch */
exports.watchCSS = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ autoInit: false});
    return gulpCSSTaskManager.watchCSS();
}

/** Compile HTML */

exports.compileHTML = (cb) => {

    const gulpHtmlTasks = new GulpHTMLTasks({ watch: false});
    gulpHtmlTasks.compileHtml();    
    cb();
}
 
exports.watchHTML = () => {
    const gulpHtmlTasks = new GulpHTMLTasks({ watch: true});
    gulpHtmlTasks.watchHtml();
}