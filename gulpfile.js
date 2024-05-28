
'use strict';

const { parallel } = require('gulp');
const hello = require('./func/gulp/hello.js');
const { fontawesomeJS } = require('./func/gulp/js.js');
const { compileCSS } = require('./func/gulp/css.js');
const { clean } = require('./func/gulp/utils.js');
const { fontawesomeFont } = require('./func/gulp/icons.js');
const GulpJSTaskManager = require('./func/gulp/classes/GulpJSTaskManager.js');


/** CSS Tasks */

exports.compileCSS = compileCSS;



/** Util Tasks */

exports.clean = clean;

/** Fontawesome Tasks */

exports.fontawesomeFont = fontawesomeFont;
exports.buildFontawesome = parallel(fontawesomeFont, fontawesomeJS);

/** Tasks */
exports.default = hello;

const gulpJSTaskManager = new GulpJSTaskManager();
exports.compileJS = gulpJSTaskManager.compileJS.bind(gulpJSTaskManager);
exports.watchJS = gulpJSTaskManager.watchJS.bind(gulpJSTaskManager);
