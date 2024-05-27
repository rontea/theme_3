'use strict';
const {src , dest} = require('gulp');
const config = require('../config/config.js');
const sass = require("gulp-sass")(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const environments = require('gulp-environments');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

const version = yargs.option('version', {
    alias: 'version',
    describe: 'Number of browser versions to support',
    type: 'number',
    default: 2
}).argv;

let production = environments.production;

function compileCSS() {

    if(argv.css) {
        compilePlainCSS();
    }else if(argv.sass){
        compileSCSS();
    }else{
        console.log("Did you forgot one of this $compile --type css --css / ");
    }
  
}

function compilePlainCSS() {
    return src(config.csspaths.stylesinc)
    .pipe(sass().on('error', sass.logError))
    .pipe(production(postcss([autoprefixer(), cssnano()])))
    .pipe(production(sass({ outputStyle: 'compressed' }).on('error', sass.logError)))
    .pipe(dest(config.csspaths.builds.destinc));
}

function compileSCSS() {
    return src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(production(postcss([autoprefixer({ 
      overrideBrowserslist: [`last ${version['version']} versions`] }), 
      cssnano()])))
    .pipe(production(sass({ outputStyle: 'compressed' }).on('error', sass.logError)))
    .pipe(development(sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

module.exports = { compileCSS , compileSCSS};
