'use strict';

const fs = require('fs');
const currentTime = require('./CreateTime');
const { time } = require('console');

class TimeLogger {

    constructor(options = {}) {

        this.logDir  = options.dir || "./logs";
        this.logFile = options.file || "./logs/log.log"; 
    }
    /**
     * Write to file specified in logFile and create DIR specified in logDir
     * @param {string} logMessage 
     */
    writeLog(logMessage) {

        const formattedLog = `${currentTime.getTime()} ${logMessage}\n`;

        try {

            if(!fs.existsSync(this.logDir)) {
                this.mkDir();
                console.log("Create DIR " , this.logDir );
            } 
       
            fs.appendFile(this.logFile, formattedLog, (err) => {
                if (err) {
                    console.error('Error writing to log file:', err);
                }else {
                    console.log("Writeline new entry " , this.logFile);
                }
            });


        }catch(err) {
            console.log("writeLog error ", err);
        }

    }

    /**
     * Create the Diretory 
    */

    mkDir() {

        try {
            fs.mkdirSync(this.logDir , (err) => {
                if(err) {
                    console.error('Error Creating DIR:', err);
                }else {
                    console.log("mkdir " , this.logDir);
                }
            });
        }catch(err) {
            console.log("mkDir error ", err);
        }
       
    }

    /**
     * Returns the time string
     * @returns string
     */

    getTime() {
        return currentTime.getTime();
    }

} 

const timeLogger = new TimeLogger();
Object.freeze(timeLogger);

module.exports = timeLogger;