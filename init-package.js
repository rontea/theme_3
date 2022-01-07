// include fs-extra package
var fs = require("fs-extra");
 
var source = './node_modules/theme_2_v1/project_src'
var destination = './'
 
// copy source folder to destination
fs.copy(source, destination, function (err) {

    if (err){
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    console.log('Copy completed!')
});