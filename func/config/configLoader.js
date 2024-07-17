'use strict';

const fs = require('fs');
const path = require('path');

try {

    // Define the default and main project config paths
    const defaultConfigPath = path.join(__dirname, './config.js');
    const mainConfigPath = path.join(process.cwd(), '/config/config.js');

    // Load the config file from the main project directory if it exists
    const configPath = fs.existsSync(mainConfigPath) ? mainConfigPath : defaultConfigPath;
    const config = require(configPath);

    module.exports = config;

}catch(err) {
    console.log("Erron on config loader : ", err);
}


