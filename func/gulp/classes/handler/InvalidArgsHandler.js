'use strict';

const EventEmitter = require('events');

class InvalidArgsHandler extends EventEmitter {

    #argv;

    #configKeys;

    #validKeys;

    constructor(argv, configKeys , validKeys = [] ) {
        
        super();
        this.#argv = argv;
        this.#configKeys = configKeys || "";
        this.#validKeys = validKeys;
    
    }

    /**
    * This method checks for invalid arguments in the command line.
    * @returns boolean
    */

    checkInvalidArgs() {

        try {

        let validKeys;
        let invalidKeys;

            if(this.#configKeys === ""){
                validKeys =  this.#validKeys;
                invalidKeys = Object.keys(this.#argv).filter(arg => arg !== '_' && arg !== '$0' && !validKeys.includes(arg));
            }else {
                validKeys = this.#configKeys.map(item => item.key).concat(this.#validKeys);
                invalidKeys = Object.keys(this.#argv).filter(key => key !== '_' && key !== '$0' && !validKeys.includes(key));
            }
           
           
            if (invalidKeys.length > 0) {

                this.emit('invalidArgs', invalidKeys, validKeys);
                throw new Error(`Invalid options provided: ${invalidKeys.join(', ')}`);
                

            } else {
                
                return true;
            }

        }catch(err) {
            
            this.#handleError(err);
            return false;

        }
    }

    
    /**
     * This method handles errors by logging them and performing any additional logic.
     * @param {Error} error - The error to handle.
    */

    #handleError(error) {
        console.error("An error occurred:", error.message);
    }
}

module.exports = InvalidArgsHandler;