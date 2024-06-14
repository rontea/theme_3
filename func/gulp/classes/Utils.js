'use strict';

const { tree } = require('gulp');
const config = require('../../config/config.js');
const fse = require('fs-extra');

class Utils {

    default(cb) {
        
        const taskTree = tree({ deep: true });
        
        console.log("List of Tasks :");
        
        taskTree.nodes.forEach(node => {
            console.log(`$gulp ${node.label} `);
        });

        cb();
        
    }

   
    hello(cb){

        console.log('============================');
        console.log('Gulp File RR Version v2.0.0 ');
        console.log('===========================');
        console.log('Command tasks view gulp --tasks');
        console.log('Documentation : ');
        console.log('Website: ');
        console.log('Git Repo: ')
        console.log('@ 2024 May')
        console.log('');
        cb();

    }

    utilsClean(){
       
        const buildFolder = config.mainbuild;
        console.log("... Clean folder ", buildFolder);
        return fse.remove(buildFolder);

    }
}


const util = new Utils();
Object.freeze(util);

module.exports = util;