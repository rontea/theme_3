'use strict';

const path = require("path");

class PathHandler {

    #destArgv;

    #baseDest;

    constructor(destArgv,baseDest) {

        this.#destArgv = destArgv || '';
        this.#baseDest = baseDest || '';

    }

    setDestArgv(destArgv) {
        this.#destArgv = destArgv;
    }

    setBaseDest(baseDest){
        this.#baseDest = baseDest;
    }
  
  /**
   * Check path supplied by --dest is not empty and not a number value
   * @param {string} destArgv
   * @returns string
   */

    getDestPath() {
        if (this.#destArgv === true || this.#destArgv === undefined || typeof this.#destArgv !== 'string') {
         
          if(typeof this.#destArgv !== 'string') {
            console.log("Path not a valid string , default to: ", this.#baseDest);
          }else {
            console.log("Path not provided default to: ", this.#baseDest);
          }
    
          return this.#baseDest;
        
        }
    
        return path.join(this.#baseDest, this.#destArgv);
    }

}

module.exports = PathHandler;