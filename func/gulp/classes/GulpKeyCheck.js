'use strict';
const config = require('../../config/configLoader');

class GulpKeyCheck {

    /**
     * Static method that will generate the keys coming from config file for JS.
    */

    static async checkJSKeySync(lang = "JS",type = "command") {
    
        console.log(`${lang} <cmd> [args]  $${type} :`);
        let prefix = "--";  
        config.jspaths.paths.forEach(item => {
            console.log( ` ${prefix}${item.key}`);
        });

        console.log(`${lang} Utilities $${type} :`);
        console.log(`   ${prefix}uglify`);
        console.log(`   ${prefix}dest `);

    }

    /**
     * Static method that will generate the keys coming from config file for CSS.
    */

    static async checkCSSKeySync(lang = "CSS",type = "command") {

        console.log(`${lang} <cmd> [args]  $${type} :`);
        let prefix = "--"; 
        config.csspaths.paths.forEach(item => {
            console.log( ` ${prefix}${item.key}`);
        });

        console.log(`${lang} Utilities $${type} :`);
        console.log(`   ${prefix}compress `);
        console.log(`   ${prefix}autoprefixer (1-5) `);
        console.log(`   ${prefix}dest `);
        
    }

    /**
    * Static method that will generate the keys coming from config file for Icons.
    */

    static async checkIconsKeySync(lang = "Icons",type = "command") {

        console.log(`${lang} <cmd> [args]  $${type} :`);
        let prefix = "--"; 
        config.icons.paths.forEach(item => {
            console.log( ` ${prefix}${item.key}`);
        });

        console.log(`${lang} Utilities $${type} :`);
        console.log(`   ${prefix}dest `);
       
    }

}

module.exports = GulpKeyCheck;