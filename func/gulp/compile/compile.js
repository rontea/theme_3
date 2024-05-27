const yargs = require('yargs');
const { compileJS } = require('../js.js');
const { compileCSS } = require('../css.js');

const type = yargs.option('type', {
    alias: 'type',
    describe: 'what type css or js',
    type: 'string',
    default: ''
}).argv;

function compile(cb) {

  let choice = type['type'];

  if (choice === 'css' ) {
    console.log("Compiling CSS... ");
    compileCSS();
  }else if (choice === 'js') {
    
    console.log("Compiling JS... ");
    compileJS();

  }else {
    console.log("In type use css or js");
  }
    cb();    
}

module.exports = { compile };