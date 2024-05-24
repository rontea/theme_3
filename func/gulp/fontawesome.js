'use strict';

const {src , dest } = require('gulp');
const config  = require('../config.js');

/**
 *  This function will copy the fontawesome SVG icons
 *  to be use in the build folder.
 */

function fontawesomeFont () {

    return src(config.icons.fontawesome.webfonts)
    .pipe(dest(config.icons.fontawesome.build));

}

module.exports = fontawesomeFont;