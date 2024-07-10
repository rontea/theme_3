'use strict';
const GulpJSTaskManager = require('../../func/gulp/classes/GulpJSTaskManager');

const compileJs = () => {
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: true });
    gulpJSTaskManager.compileJsSync();
};

const buildJs = () => {
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: false , 
        build: true, key: 'js'});
    gulpJSTaskManager.compileJsSync();
};

const buildJsFontawesome = () => {
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: false , 
        watch: false, build: true, key: 'fontawesome'});
    gulpJSTaskManager.compileJsSync();
}

const watchJs = () => {
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: false , watch: true});
    gulpJSTaskManager.watchJsSync();
};

module.exports = { compileJs , buildJs , buildJsFontawesome , watchJs };