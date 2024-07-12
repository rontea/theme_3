'use strict';

const ProjectMaker = require('../../func/scripts/ProjectMaker');
const urlPathMaker = require('../../func/utils/utils');

const projectFolders = () => {
    let dest = urlPathMaker.twhUrlPathMaker({ topFolder: "../theme_3_v1", folder: "test"});
    let src = urlPathMaker.twhUrlPathMaker();

    const projectMaker = new ProjectMaker({src : src, dest : dest, dir: [ 'html' , 'src']});
    projectMaker.displayInfo();
    projectMaker.createNewProjectSync();
};

const setConfig = () => {
    let dest = urlPathMaker.twhUrlPathMaker({ topFolder: "../theme_3_v1/", folder: "test"});
    let src = urlPathMaker.twhUrlPathMaker({topFolder: "../theme_3_v1/", folder: "func"});

    const projectMaker = new ProjectMaker({src : src, dest : dest, dir: ['config'], file: '/config.js'});
    projectMaker.displayInfo();
    projectMaker.createNewProjectSync();
};

module.exports = {projectFolders ,  setConfig}