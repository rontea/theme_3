'use strict';

const path = require('path');

function twhUrlPathMaker(url = {}){

    url.topFolder = url.topFolder || "";
    url.folder = url.folder || "";

    return path.resolve(__dirname, '..', '..', url.topFolder , url.folder); 

}

function test(){
    console.log("Test");
}

module.exports = {twhUrlPathMaker , test};