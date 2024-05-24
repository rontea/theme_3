'use strict';

const fse = require('fs-extra');
const config = require('../config.js');

/**
 * This function will remove/delete the build folder.
 * @returns fse.remove()
 */

function clean() {

    return fse.remove(config.builds.paniniBuild);
   
}

module.exports = { clean };