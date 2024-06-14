
'use strict';

const { parallel } = require('gulp');
const GulpJSTaskManager = require('./func/gulp/classes/GulpJSTaskManager.js');
const GulpCSSTaskManager = require('./func/gulp/classes/GulpCSSTaskManager.js');
const GulpHTMLTasks = require('./func/gulp/classes/GulpHTMLTasks.js');
const GulpImageTasks = require('./func/gulp/classes/GulpImageTasks.js');
const utils = require('./func/gulp/classes/Utils.js');
const gulpKeyCheck = require('./func/gulp/classes/GulpKeyCheck.js');



/** Util Tasks */

exports.default = utils.default.bind();

exports.check = utils.hello.bind();

exports.clean = utils.utilsClean.bind();

/** Manual Check Key */
exports.keyCheck = (cb) => {
    gulpKeyCheck.checkJSKey();
    gulpKeyCheck.checkCSSKey();
    cb();
}

/** JS Tasks */
exports.compileJS = () => {
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: true });
    return gulpJSTaskManager.compileJS();
}

/** JS Watch */
exports.watchJS = () => { 
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: false , watch: true});
    return gulpJSTaskManager.watchJS();
}

/** JS Build Task */
exports.buildJS = () => {
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: false , 
            build: true, key: 'js', uglify: true });
    return gulpJSTaskManager.compileJS();
}

/** CSS Tasks */
exports.compileCSS = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ autoInit: true , watch: false });
    return gulpCSSTaskManager.compileCSS();
}

/** CSS Build Task */
exports.buildCSS = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ 
        autoInit: false, build: true, key: 'css' });

    return gulpCSSTaskManager.compileCSS();
}

/** CSS and SCSS Watch */
exports.watchCSS = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ autoInit: false , build: true});
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

/** Ccmpile Image */

exports.buildImage = (cb) => {
    const gulpImageTasks = new GulpImageTasks({ watch: false});
    gulpImageTasks.compileImages();
    cb();
}

exports.watchImage = (cb) => {
    const gulpImageTasks = new GulpImageTasks({ watch: true});
    gulpImageTasks.watchImages();
    cb();
}