'use strict';

const GulpResourceHandler = require('../../func/gulp/classes/GulpResourceHandler');
const logErr = require('../../func/utils/TimeLogger');

const moveResources = () => {

    try{
        const gulpResourceHandler = new GulpResourceHandler();
    }catch(err){
        logErr.writeLog(err , {customKey: 'Task resources error'});
    }
    
};

module.exports = { moveResources };