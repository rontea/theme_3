'use strict';

const ProjectMaker = require('../../scripts/ProjectMaker');
const urlPathMaker = require('../../func/utils/utils');

module.exports = () => {
    let dest = urlPathMaker.twhUrlPathMaker({ topFolder: "../theme_3_v1", folder: "test"});
    let src = urlPathMaker.twhUrlPathMaker();

    const projectMaker = new ProjectMaker({src : src, dest : dest, dir: [ 'html' , 'src']});
    projectMaker.displayInfo();
    projectMaker.createNewProjectSync();
};