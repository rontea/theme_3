'use strict';

const GulpCSSTaskManager = require('../../func/gulp/classes/GulpCSSTaskManager');

const compileCss = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ autoInit: true , 
        watch: false, getHelp : true , command : "css-compile" });
    
    gulpCSSTaskManager.compileCssSync();
};

const buildCss = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ 
        autoInit: false, build: true, key: 'css' });
    gulpCSSTaskManager.compileCssSync();
}

const buildScss = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ 
        autoInit: false, watch:false, build: true, key: 'scss' });
    gulpCSSTaskManager.compileCssSync();
}

const buildFontawesomeCss = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ 
        autoInit: false, build: true, key: 'fontawesome' });
    gulpCSSTaskManager.compileCssSync(); 

}

const buildBootstrapIconsCss = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ 
        autoInit: false, build: true, key: 'bootstrapIcon'  });
    gulpCSSTaskManager.compileCssSync(); 
}

const watchCss = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ autoInit: false , build: true});
    gulpCSSTaskManager.watchCSS();
}

module.exports = { compileCss , buildCss, buildScss , buildFontawesomeCss
    , buildBootstrapIconsCss , watchCss };