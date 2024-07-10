#!/usr/bin/env node
'use strict';

const { program } = require('commander');
const timeLogger = require('../func/utils/TimeLogger');
const createProject = require('./tasks/createProject');
const { createGulpSymlink , unlinkGulpSymlink } = require('./tasks/symlinkGulpFile');
const utils = require('../func/gulp/classes/Utils');


/** Commands */
// --version
program
    .version('2.0.0')
    .description('Theme_3 CLI Project Manager');

program
    .command('new-project')
    .description('Create a new project.')
    .action(createProject);


program
    .command('gulplink')
    .description('Create or remove the Gulp symlink')
    .option('--create', 'Create a Gulp symlink')
    .option('--unlink' , 'Remove a Gulp symlink')
    .action((cmd) => {

        if(cmd.create){
          createGulpSymlink();
        } else if(cmd.unlink){
            unlinkGulpSymlink();
        }else{
            console.log("Please specify either --create or --unlink");
        }

    });

program
    .command('clean-build')
    .description('Clean the build folder')
    .action(utils.utilsCleanSync.bind());

program.parse(process.argv);


