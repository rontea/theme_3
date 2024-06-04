
'use strict';

const { parallel } = require('gulp');
const hello = require('./func/gulp/hello.js');
const { clean } = require('./func/gulp/utils.js');
const { fontawesomeFont } = require('./func/gulp/icons.js');
const GulpJSTaskManager = require('./func/gulp/classes/GulpJSTaskManager.js');
const GulpCSSTaskManager = require('./func/gulp/classes/GulpCSSTaskManager.js');


/** Util Tasks */

exports.clean = clean;

/** Fontawesome Tasks */

exports.fontawesomeFont = fontawesomeFont;


/** Tasks */
exports.default = hello;

/** JS Tasks */
exports.compileJS = () => {
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: true });
    return gulpJSTaskManager.compileJS();
}
exports.watchJS = () => { 
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: false });
    return gulpJSTaskManager.watchJS();
}

exports.buildJS = () => {
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: false , build: true, key: 'js'});
    return gulpJSTaskManager.compileJS();
}

/** CSS Tasks */

exports.compileCSS = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ autoInit: true });
    return gulpCSSTaskManager.compileCSS();
}

exports.buildCSS = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ autoInit: false, build: true, key: 'x' });
    return gulpCSSTaskManager.compileCSS();
}


