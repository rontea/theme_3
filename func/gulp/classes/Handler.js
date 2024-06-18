'use strict';
const path = require("path");
const fs = require("fs-extra");

class Handler {

    /**
     * Handle the file delete
     * @param {string} file 
     * @param {string} src 
     * @param {string} dest 
     */

    handlerOnDeleteFile(file,src,dest) {

        console.log("... On Delete > ", file);
        const relativePath = path.relative(src, file);
        const destFile = path.join(dest, relativePath);

        fs.remove(destFile)
        .then( () => {
            console.log("Removed File Success , Path", destFile);
        }).catch(err => {
            console.error(err);
        });
    }

    handlerSetOnDeleteFile(destFile){
        fs.remove(destFile)
        .then( () => {
            console.log("Removed File Success , Path", destFile);
        }).catch(err => {
            console.error(err);
        });
    }

    /**
     * Handle the Directory Add
     * @param {string} dir 
     * @param {string} src 
     * @param {string} dest 
     */

    handlerOnDirAdd(dir,src,dest) {
        
        console.log("... On Dir Created > ", dir);
        
        const relativePath = path.relative(src, dir);
        const destFile = path.join(dest, relativePath);

        fs.ensureDir(destFile)
        .then( () => {
            console.log(".... Dir Created >" , destFile);
        }).catch(err => {
            console.error(err);
        });
        
    }

    /**
     * 
     * @param {string} dir 
     * @param {string} src 
     * @param {string} dest 
     */

    handlerOnDirDelete(dir,src,dest) {

    
    }

    /**
     * Handle Error
     * @param {*} error 
     */

    handlerError(error) {

        if (err.code === 'EPERM') {
            console.error('Permission error:', err);
        } else {
            console.error('Error watching files:', err);
        }

    }
}

const handler = new Handler();
Object.freeze(handler);

module.exports = handler;