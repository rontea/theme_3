'use strict';

/**
 *  Gulp Tasks
 */

const { parallel } = require('gulp');
const hello = require('./func/gulp/hello.js');
const { fontawesomeJS } = require('./func/gulp/js.js');
const { compile } = require('./func/gulp/compile/compile.js');
const { clean } = require('./func/gulp/utils.js');
const fontawesomeFont  = require ('./func/gulp/fontawesome.js');




/** Tasks */
exports.default = hello;

/** CSS Tasks */

exports.compile = compile;

/** JS Tasks */



/** Util Tasks */

exports.clean = clean;

/** Fontawesome Tasks */

exports.fontawesomeFont = fontawesomeFont;
exports.buildFontawesome = parallel(fontawesomeFont, fontawesomeJS);
