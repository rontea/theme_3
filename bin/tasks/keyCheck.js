'use strict';

const gulpKeyCheck = require('../../func/gulp/classes/GulpKeyCheck');

const checkCssKey = () => {
    gulpKeyCheck.checkCSSKeySync();
};

const checkJsKey = () => {
    gulpKeyCheck.checkJSKeySync();
};

module.exports = { checkCssKey , checkJsKey};