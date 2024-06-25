'use strict';

const timeLogger = require('../func/utils/TimeLogger');
const MenuBuilder = require('../scripts/MenuHandler');
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
        console.log("sample 2");
    },
    '3': () => {
        console.log("sample 3");
    },
    '4': () => {
        console.log("Exit");
    }
        
};

menuBuilder.displayMenu();
menuBuilder.setHandleOptions(optionCallbacks,"Option Not Available.");