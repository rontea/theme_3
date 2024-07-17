'use strict';

const FileLister = require('../../func/scripts/FileLister');
const configLoader = require('../../func/config/configLoader');


const fileLister = () => {
   
    const fileLister = new FileLister(configLoader.settings.filelister);
    console.log("List file structure on :" , fileLister.getDirs());
    console.log();
    fileLister.createListTree();
    console.log();
}

const compareDir = () => {

    /** Work inProgress */
    const listUpdates = [];

    console.log("New : ", listUpdates);

}

const checkEnv = () => {
    
    console.log("Current Enviroment :" , configLoader.env);
    
}

const checkConfigSync = async () => {
    console.log("Config.js File List :");
    console.log(configLoader);
    console.log();
}

module.exports = {fileLister , checkEnv , checkConfigSync , compareDir};