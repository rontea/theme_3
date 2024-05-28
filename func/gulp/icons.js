'use strict';

const {src , dest } = require('gulp');
const config  = require('../config/config.js');

/**
 *  This function will copy the fontawesome SVG icons
 *  to be use in the build folder.
 */

function fontawesomeFont() 
{

    return src(config.icons.fontawesome.webfonts)
        .pipe(dest(config.icons.fontawesome.build));

}

function bootstrapFont()
{
    return src(config.icons.bootstrap.webfonts)
        .pipe(dest(config.icons.bootstrap.build));
}



module.exports = { fontawesomeFont , bootstrapFont };