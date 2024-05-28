'use strict';
const {src , dest} = require('gulp');
const config = require('../config/config.js');
const sass = require("gulp-sass")(require('sass'));
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');


function compileCSS(cb) 
{

    const argv = yargs(hideBin(process.argv)).argv;

    if(argv.css) 
    {
        compilePlainCSS();
    }else if(argv.sass)
    {
        compileSCSS();
    }
    else if(argv.fontawesome)
    {
        compileFontawesomeCSS();
    }
    else if(argv.bootstrap) 
    {
        compileBootstrapCSS();
    }
    else if(argv.bootstrapicons)
    {
        compileBootstrapIconsCSS();
    }
    else
    {
        console.log("Tasks did Not Complete");
        console.log("Did you forgot one of this $gulp compileCSS --css / --sass / --fontawesome / --bootstrap / --bootstrapicons");
    }
  cb();
}

function compilePlainCSS() 
{
    return src(config.csspaths.stylesinc)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(config.csspaths.builds.destinc));
}

function compileSCSS() 
{
    return src(config.csspaths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(config.csspaths.builds.dest));
}

function compileFontawesomeCSS() 
{
    return src(config.csspaths.fontawesome)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(config.csspaths.builds.destinc));
        
}

function compileBootstrapCSS() {
    return src(config.csspaths.bootstrap)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(config.csspaths.builds.destinc));
}

function compileBootstrapIconsCSS() 
{
    return src(config.csspaths.bootstrapicon)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(config.csspaths.builds.destinc));
}

module.exports = { compileCSS , compileSCSS, compileFontawesomeCSS 
    , compileBootstrapCSS , compileBootstrapIconsCSS };
