'use strict';

const path = require('path');

function twhUrlPathMaker(url = {}){

    try{
        
        url.topFolder = url.topFolder || "";
        url.folder = url.folder || "";

        return path.resolve(__dirname, '..', 
            '..', url.topFolder , url.folder); 
    
    } catch(err){
        console.log("Error on URL pathmaker : ", err);
    }
}

function test(){
    console.log("Test");
}


module.exports = {twhUrlPathMaker , test};