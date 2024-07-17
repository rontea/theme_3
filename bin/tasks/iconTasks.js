'use strict';

const GulpIconTasks = require('../../func/gulp/classes/GulpIconTasks');

const moveBootstrapIcons = () => {
    const gulpIconTasks = new GulpIconTasks({ autoInit: false, watch: false,
        build: true, key: 'bootstrap'});
    gulpIconTasks.compileIconSets();
    
} 

const moveFontawesomeIcons = () => {
    const gulpIconTasks = new GulpIconTasks({ autoInit: false, watch: false,
        build: true, key: 'fontawesome'});
    gulpIconTasks.compileIconSets();
}

const compileIcons = () => {
    const gulpIconTasks = new GulpIconTasks({ autoInit: true , build : false
        , getHelp : true , command : "icons-compile"});
    gulpIconTasks.compileMultiDest();
}

module.exports = { moveBootstrapIcons, moveFontawesomeIcons, compileIcons};
