'use strict';

const timeLogger = require('../func/utils/TimeLogger');

console.log(timeLogger.getTime());
timeLogger.writeLog("test message");
console.log(`❌`);
console.log(`📁`);
console.log(`⚠️`);