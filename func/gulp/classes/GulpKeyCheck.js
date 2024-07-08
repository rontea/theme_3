'use strict';
const config = require('../../config/configLoader');

class GulpKeyCheck {

    /**
     * Static method that will generate the keys coming from config file for JS.
    */

    static async checkJSKeySync() {
    
        console.log("JS Key where $gulp command --key ..");
        let prefix = "--";  
        config.jspaths.paths.forEach(item => {
            console.log( ` ${prefix}${item.key}`);
        });

        console.log("JS Key + Uglify $gulp command --key --uglify");
        console.log(`   ${prefix}uglify`);

    }

    /**
     * Static method that will generate the keys coming from config file for CSS.
    */

    static async checkCSSKeySync() {

        console.log("CSS Key where $gulp command --key ..");
        let prefix = "--"; 
        config.csspaths.paths.forEach(item => {
            console.log( ` ${prefix}${item.key}`);
        });

        console.log("CSS Key + Compress and AutoPrefixer $gulp command --key --compress ..");
        console.log(`   ${prefix}compress `);
        console.log(`   ${prefix}autoprefixer (num 1-5) `);
        
    }

}

module.exports = GulpKeyCheck;