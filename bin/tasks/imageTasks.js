'use strict';
const GulpImageTasks = require('../../func/gulp/classes/GulpImageTasks');

const buildImages = () => {
    const gulpImageTasks = new GulpImageTasks({ watch: false});
    gulpImageTasks.compileImagesSync();
};

const watchImages = () => {
    const gulpImageTasks = new GulpImageTasks({ watch: true});
    gulpImageTasks.watchImagesSync();
}

module.exports = { buildImages, watchImages };