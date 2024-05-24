'use strict';
const {parallel} = require('gulp');
const hello = require('./func/gulp/hello.js');
const { compileJS , compileJquery, compilePopper
    , compileTether , compileBSJS, fontawesomeJS } = require('./func/gulp/js.js');
const {clean} = require('./func/gulp/utils.js');
const fontawesomeFont  = require ('./func/gulp/fontawesome.js')

/** Tasks */

exports.default = hello;

/** CSS Tasks */

/** JS Tasks */

exports.compileJS = compileJS;
exports.compileJquery = compileJquery;
exports.compilePopper = compilePopper;
exports.compileTether = compileTether;
exports.compileBSJS = compileBSJS;
exports.fontawesomeJS = fontawesomeJS;


/** Util Tasks */

exports.clean = clean;

/** Fontawesome Tasks */

exports.fontawesomeFont = fontawesomeFont;
exports.buildFontawesome = parallel(fontawesomeFont, fontawesomeJS);
