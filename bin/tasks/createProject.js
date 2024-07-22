'use strict';

const ProjectMaker = require('../../func/scripts/ProjectMaker');
const urlPathMaker = require('../../func/utils/utils');
const configLoader = require('../../func/config/configLoader');
const path = require('path');

const projectFolders = () => {
    const projectMaker = new ProjectMaker({ dir: [ 'html' , 'src']});
    projectMaker.displayInfo();
    projectMaker.createNewProjectSync();
};

const setConfig = () => {

    let src = urlPathMaker.twhUrlPathMaker({ topfolder:"node_modules" ,folder: "func"});

    const projectMaker = new ProjectMaker({src : src, dir: ['config'], file: '/config.js'});
    projectMaker.displayInfo();
    projectMaker.createNewProjectSync();
};

module.exports = {projectFolders ,  setConfig}