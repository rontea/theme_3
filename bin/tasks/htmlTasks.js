'use strict';

const GulpHTMLTasks = require('../../func/gulp/classes/GulpHTMLTasks');

const buildHtml = () => {
    const gulpHtmlTasks = new GulpHTMLTasks({ watch: false});
    gulpHtmlTasks.compileHtmlSync();   
};

const watchHtml = () => {
    const gulpHtmlTasks = new GulpHTMLTasks({ watch: true});
    gulpHtmlTasks.watchHtmlSync();
};

module.exports = { buildHtml , watchHtml };
