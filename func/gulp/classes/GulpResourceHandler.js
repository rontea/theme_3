'use strict';

const config = require("../../config/config.js");
const argv = require("yargs").argv;
const readline = require('readline');
const {glob} = require('glob');
const fs = require('fs');
const {dest , src } = require('gulp');
const path = require('path');

class GulpResourceHandler {

    /**
     * 
     * @param {options.src : string , options.dest: string 
     *  options.setLock : boolean  } options 
     */
    constructor (options = {}) {

        /** List */
        this.src = options.src || argv.src;
        this.dest = options.dest || argv.dest;
        this.setLock = config.resources.setlock || options.setLock;

        this.srcDef = config.resources.mainsrc;
        this.destDef = config.resources.destdef;

        /** Lock */
        if(this.setLock) {
            
            this.src = this.srcDef + this.src;
            this.dest = this.destDef + this.dest;

            console.log("Note : Option Lock for folder source:" , this.src);
            console.log("Note : Option Lock for folder destination:" , this.dest);
        
        /** Move All */    
        }else {
            this.src = '/' + this.src;
            this.dest = "build/" + this.dest;
            console.log("Note : Option Unlock for folder move item anyware.");
        }

        this.moveFilesSync();
    }
    /**
     * This will check for confirmation from user.
     * @returns boolean
     */
     async checkMoveSync() {

        return new Promise((resolve,reject) => {

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
    
            rl.question(`Are you sure to move "${this.src}" to "${this.dest}" "y/n"? : `,
                (answer) => {
                    rl.close();
                    if(answer.toLowerCase() === 'y') {
                     
                        resolve(true);
                    }else if(answer.toLowerCase() === 'n') {
                        
                        resolve(false);
                    }else {
                        console.log("No valid option");
                        resolve(false);

                    }
    
                }
            );
        });
    }

    /**
     * This will move the files from source to destination
     * @returns gulp 
     */

    async moveFilesSync() {

        let filePath = this.src;

        try {
           
            if(this.isDirectorySync(filePath)) {
                filePath = path.posix.join(filePath, "/**/*");
            }
            
            console.log(filePath);

            const isDir = this.isDirectorySync(this.src);

            const files = await glob(filePath);
           
            console.log("List : " , files);
            
        /** Checki Src exist */
        if (!fs.existsSync(this.src)) {
            console.log('--src doesnt exist try again with correct source path.');
            console.log(`Moving folder from ${this.src} -> ${this.dest} FAILED!`);
            return;
        }

        /** Wait first for user confirmation Before Moving */
        const userConfirmed = await this.checkMoveSync();

        if (!userConfirmed) {
            console.log("Move Cancelled.");
            return;
        }

        console.log("Processing Move ...");
        
        let stream = "";

        if(isDir) {
            stream = src(this.src + "/**/*");
            
        }else {
            stream = src(this.src);
        }
        
        stream = stream.pipe(dest(this.dest));
        
        return stream.on('end', () => {
            console.log("Move Completed ...");
        })
        .on('error' , (error) => {
            console.log(error);
        });
        
        }catch (err) {
            console.log(err);
        }

    }
    
    /**
     * This will check if file is a DIR or not.
     * @param {string} filePath 
     * @returns boolean
    */

    isDirectorySync(filePath) {
        try {
            const stats = fs.statSync(filePath);
            return stats.isDirectory();
        } catch (err) {
            // If an error occurs, log it and return false
            console.error('Error checking path:', err);
            return false;
        }
    }
}

module.exports = GulpResourceHandler;