#!/usr/bin/env node
'use strict';
const yargs = require('yargs');
const {projectFolders , setConfig} = require('./tasks/createProject');
const { compileCss , buildCss , buildScss 
    , buildFontawesomeCss, buildBootstrapIconsCss 
    , watchCss } = require('./tasks/cssTasks');
const {  compileJs , buildJs , buildJsFontawesome
    , watchJs } = require('./tasks/jsTasks');
const utils = require('../func/gulp/classes/Utils');
const { checkCssKey , checkJsKey , checkIconsKey} = require('./tasks/keyCheck');
const {  buildHtml , watchHtml } = require('./tasks/htmlTasks');
const {  buildImages, watchImages } = require('./tasks/imageTasks');
const { moveBootstrapIcons, moveFontawesomeIcons
    , compileIcons} = require('./tasks/iconTasks');
const { moveResources } = require('./tasks/resourcesTasks');
const { createGulpSymlink , unlinkGulpSymlink } = require('./tasks/symlinkGulpFile');

try {

    
yargs
.scriptName("th3")
.usage('$0 <cmd> [args]')
.help()
.alias('help', 'h')
.demandCommand(1 , "You need to specify at least one command")
.strict()
.wrap(null)
.command('version', "Check current version", () => {}, () => {
  console.log("2.0.0");
})
.command('new-project', "Create new Project folder [html , src]", async () => {
   projectFolders();
})
.command('set-config', "Create config for edit [config/config.js]", async () => {
   setConfig();
 })
 .command('gulplink' , "Check available Keys" , (yargs) => {
    return yargs
        .option('create' , {
            alias: 'c',
            type: 'boolean',
            description: "Create symlink for Gulpfile"
        })
        .option('unlink' , {
            alias: 'u',
            type: 'boolean',
            description: "Unlink symlink for Gulpfile"
        })
}, (argv) => {

    if(argv.create) {
       createGulpSymlink();
    } else if(argv.unlink) {
       unlinkGulpSymlink();
    }else {
        console.log("Command not available");
    }

})
.command('clean-build', "Clean build folder", async () => {
    utils.utilsCleanSync();
})
.command('clean', "Clean build folder", async () => {
    utils.utilsCleanSync();
})
.command('key-help' , "Check available Keys" , (yargs) => {
    return yargs
        .option('css' , {
            alias: 'c',
            type: 'boolean',
            description: "Check available keys in CSS"
        })
        .option('js' , {
            alias: 'j',
            type: 'boolean',
            description: "Check available keys in JS"
        })
        .option('icons' , {
            alias: 'i',
            type: 'boolean',
            description: "Check available keys in Icons"
        })

}, (argv) => {

    if(argv.css) {
        checkCssKey();
    } else if(argv.js) {
        checkJsKey();
    }else if(argv.js) {
        checkIconsKey();
    }else {
        console.log("Command not available");
    }

})
.command('css-compile' , "Compile list of CSS and SCSS", () => {
  compileCss();
})
.command('css-build' , "Build CSS", () => {
  buildCss();
})
.command('scss-build' , "Build SCSS", () => {
  buildScss();
})
.command('css-watch' , "Watch CSS", () => {
  watchCss();
})
.command('js-compile' , "Compile list of JS", () => {
 compileJs();
})
.command('js-build' , "Build JS", () => {
 buildJs();
})
.command('js-watch' , "Watch JS", () => {
 watchJs();
})
.command('html-build' , "Build HTML", () => {
    buildHtml();
})
.command('html-watch' , "Watch HTML", () => {
    watchHtml();
})
.command('img-build' , "Build images", () => {
    buildImages();    
})
.command('img-watch' , "Build images", () => {
    watchImages();    
})
.command('icons-compile' , "Compile icons", () => {
   compileIcons();    
})
.command('build-init' , "Build HTML, SCSS, CSS, JS, and Images", async () => {
    buildHtml(); buildScss(); buildCss(); buildJs(); buildImages();
})
.command('watch' , "Watch HTML, Images, CSS, and JS", async () => {
    watchHtml(); watchImages(); watchCss(); watchJs();
})
.command('icons-fontawesome' , "Compile icons fontawesome", async () => {
        buildFontawesomeCss();
        buildJsFontawesome();
        moveFontawesomeIcons();
})
.command('icons-bootstrap' , "Compile icons bootstrap", async () => {
    buildBootstrapIconsCss();
    moveBootstrapIcons();
})
.command('move-res' , "Compile icons", async () => {
    moveResources();    
})
.fail((msg, err, yargs) => {

    if (err) throw err; 
    console.error('Error:', msg);
    console.log(yargs.help());
    process.exit(1);
})
.argv;


}catch(err){
    console.log(err);
}
