'use strict';

const path = require('path');
const urlPathMaker = require('../func/utils/utils');
const fs = require('fs');
const {src,dest} = require('gulp');

class ProjectMaker {

    constructor(options = {}) {

        const makeSrc = urlPathMaker.twhUrlPathMaker({topFolder: 'node_modules' 
            , folder : 'theme_3_v1' });
        const makeDest = urlPathMaker.twhUrlPathMaker();

        this.src = options.src || makeSrc;
        this.dest = options.dest || makeDest;

        this.directories = options.dir || [];
        this.dirCheck = [];


    }

    displayInfo(info = "Dir and File Information") {

        console.log(info)
        console.log("Source : ", this.src);
        console.log("Destination :" , this.dest);

        console.log("Folders: ")
        this.directories.forEach(diretory => {
            console.log(diretory);
        });

        console.log(this.directories);
        console.log(this.dirCheck);
    }

    copyDir() {

        if(this.checkDestination) {

        }
    }

    createNewProject() {

        try {

            fs.readdir(this.dest, (err, files) => {

                if (err) {
                    console.error(`Error reading directory ${this.dest}: ${err}`);
                    console.log("Does Not Exist");
                    return;
                }else {
                    console.log("Folder exist :" , this.dest , files);

                    this.directories.forEach(directory => {
                        if(files.includes(directory)){

                            
                            console.log("Sub Dir Exist: ", directory);

                        }else {
                            this.copyDirectory(directory);
                            console.log("Sub Dir Non Existing: ", directory);
                        }
                    });
                  
                    return true;
                }

            });


        }catch(err) {
            console.log("Destination check error :", err)
        }
    }

    async copyDirectory(directory){

        try {

            const srcPath = path.join(this.src , directory);
            const destPath = path.join(this.dest , directory);

            console.log("src " , srcPath);
            console.log("dest " , destPath);
            
            fs.copyFile(srcPath, destPath, (err) => {

                if(err) {
                    console.log("Copy file failed : ", err);
                }else {
                    console.log("Copy completed : ", destPath);
                }
                
            });

        }catch(err) {
            console.log("Copy Dir error : ", err);
        }

    }
}

module.exports = ProjectMaker;
