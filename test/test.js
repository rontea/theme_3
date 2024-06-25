'use strict';

const timeLogger = require('../func/utils/TimeLogger');
const MenuBuilder = require('../scripts/MenuHandler');
const SymLink = require('../scripts/SymLink');
const urlPathMaker = require('../func/utils/utils');

/*
console.log(timeLogger.getTime());
timeLogger.writeLog("test message");
console.log(`❌`);
console.log(`📁`);
console.log(`⚠️`);
*/


const menuBuilder = new MenuBuilder( {title : "=== Menu ===" , footer: "========"} ,  
    [ "New Project", "Create Gulp Link" , "Remove Gulp Link" ,"Exit"] );


const optionCallbacks = {
    '1': () => {
        console.log("sample");
    },
    '2': () => {

        let url = urlPathMaker.twhUrlPathMaker({ topFolder: "../theme_3_v1", folder: "test"});
        let url2 = urlPathMaker.twhUrlPathMaker();
        const symlink = new SymLink({ src : url2 , dest: url});
        symlink.displayInfo();
        symlink.createSymLink();
    },
    '3': () => {
        let url = urlPathMaker.twhUrlPathMaker({ topFolder: "../theme_3_v1", folder: "test"});
        let url2 = urlPathMaker.twhUrlPathMaker();
        const symlink = new SymLink({ src : url2 , dest: url});
        symlink.displayInfo();
        symlink.removeSymLink();
    },
    '4': () => {
        console.log("Exit");
    }
        
};

menuBuilder.displayMenu();
menuBuilder.setHandleOptions(optionCallbacks,"Option Not Available.");