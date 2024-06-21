'use strict';

const { tree } = require('gulp');
const config = require('../../config/config.js');
const fse = require('fs-extra');

class Utils {

    /**
     * This will diplay tasks on gulpfile.js
     * @param {*} cb 
    */

    default(cb) {
        
        const taskTree = tree({ deep: true });
        
        console.log("List of Tasks :");
        
        taskTree.nodes.forEach(node => {
            console.log(`$gulp ${node.label} `);
        });

        cb();
        
    }

    /**
     * My Project Information
     * @param {*} cb 
     */
   
    hello(cb){

        console.log('============================');
        console.log('Gulp File RR Version v2.0.0 ');
        console.log('===========================');
        console.log('Command tasks view gulp --tasks');
        console.log('Documentation : ');
        console.log('NPM : https://www.npmjs.com/package/theme_3_v1')
        console.log('Website: https://live-rontea.pantheonsite.io/');
        console.log('Git Repo: https://github.com/rontea/theme_3_V1/tree/1.3.0')
        console.log('@ 2024 May RonTea')
        console.log('');
        cb();

    }

    /**
     * This will delete the build folder.
     * @returns remove folder
     */

    utilsClean(){
       
        const buildFolder = config.mainbuild;
        console.log("... Clean folder ", buildFolder);
        return fse.remove(buildFolder);

    }
}

/**
 *  Use without declaration of class
 */
const util = new Utils();

Object.freeze(util);

module.exports = util;