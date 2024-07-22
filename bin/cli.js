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
const {fileLister , checkEnv ,  checkConfigSync} = require('./tasks/projectHelper');

try {
/**npx git-cz */

yargs
.scriptName("th3")
.usage('$0 <cmd> [args]')
.demandCommand(1 , "You need to specify at least one command")
.command('version', "Check current version", () => {}, () => {
  console.log("2.0.0");
})
.command('new-project', "Create new Project folder [html , src]", async () => {
   projectFolders();
})
.command('set-config', "Create config for edit [config/config.js]", async () => {
   setConfig();
 })
 /*
 .command('gulplink' , "Link or Unlink Gulpfile" , (yargs) => {
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
}) */
.command('clean-build', "Clean build folder", async () => {
    utils.utilsCleanSync();
})
.command('clean', "Clean build folder", async () => {
    utils.utilsCleanSync();
})
.command('dir-check' , "Check DIR's Enviroment" , (yargs) => {
    return yargs
        .option('env' , {
            alias: 'e',
            type: 'boolean',
            description: "Check Enviroment"
        })
        .option('config' , {
            alias: 'c',
            type: 'boolean',
            description: "Check config"
        })
        .option('dirchk' , {
            alias: 'd',
            type: 'boolean',
            description: "Check your scr directory"
        })
        .option('dircomp' , {
            alias: 'i',
            type: 'boolean',
            description: "Compare your scr vs th3 scr **inprogress"
        })

}, (argv) => {

    if(argv.env) {
      checkEnv();
    }
    else if(argv.config) {
       checkConfigSync();
    } else if(argv.dirchk) {
        fileLister();
    }else if(argv.dircomp) {
        console.log("checking");
    }else {
        console.log("Command not available");
    }
})
.command('css-compile' , "Compile list of CSS and SCSS", () => {
  compileCss();
}).help().alias('help', 'h')
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
.command('img-watch' , "Watch images", () => {
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
.command('move-res' , "Move resources folder or file to build based on dest", async () => {
    moveResources();    
})
.help().alias('help', 'h')
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
