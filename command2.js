'use strict';

const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const source = path.resolve(__dirname, '..', '..', 'node_modules', 'theme_3_v1', 'project_src');
const destination = path.resolve(__dirname, '..', '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


/** Check DIR */

function isExist() {
    const destinationDirExists = fs.existsSync(destination) && fs.lstatSync(destination).isDirectory();
    return destinationDirExists;
}

/** Function Display Menu */

function displayMenu() {
    console.log('=== Menu ===');
    console.log('1. New Project');
    console.log('2. Create Gulp Link');
    console.log('3. Update');
    console.log('4. Remove Gulp Link');
    console.log('5. Exit');
}
/** Copy Directory */

function copyDirectoriesAndCreateSymlink() {
    const directories = ['html', 'src'];
  
    directories.forEach((directoryName) => {
      const sourceDir = path.join(source, directoryName);
      const destinationDir = path.join(destination, directoryName);
  
        fs.copy(sourceDir, destinationDir, (err) => {
          if (err) {
            console.error(`Error copying directory '${directoryName}':`, err);
          } else {
            console.log(`Directory '${directoryName}' copied successfully.`);
          }
        });
      
    });
  
    /**
     * Symlink
     */
  
    createSymLink();
}

/** Create symlink */

function createSymLink (){
    /**
     * Symlink
     */
  
    const sourcePath = path.join(source, 'gulpfile.js');
    const symlinkPath = path.join(destination, 'gulpfile.js');
  
    console.log('===========================');
    console.log('Execute symlink');
    console.log('Path Information');
    console.log('Destination: ' + destination);
    console.log('Symlink: ' + symlinkPath);
    console.log('Source: ' + sourcePath);
    console.log('===========================');
  
    if (!fs.existsSync(symlinkPath)) {
      fs.symlink(sourcePath, symlinkPath, 'file', (err) => {
        if (err) {
          console.log('!!!=== Error Return Shortcut Already exist===!!!');
          console.error('Error creating symlink:', err);
          console.log('!!!======!!!');
        } else {
          console.log('===========================');
          console.log('Symlink created successfully.');
          console.log('===========================');
        }
      });
    } else {
      console.log('gulp.js was not copied!! already exists!!.');
    }
}

/** remove Symlink */

function removeSymLink() {

    const symlinkPath = path.join(destination, 'gulpfile.js');
    console.log(symlinkPath);

    if (fs.existsSync(symlinkPath)) {
        rl.question('Do you want to copy directories and create a symlink? (yes/no): ', (answer) => {
            if (answer.toLowerCase() === 'yes') {
                fs.unlink(symlinkPath, (err) => {
                    if (err) {
                      console.error(`Error removing symlink: ${err}`);
                    } else {
                      console.log('Symlink removed successfully.');
                    }
                });
            } else {
            console.log('Exit');
            
            }
            rl.close();
        });
    }else {
        console.log("Gulp link has not been created yet");
    }
   

}

function handleOption(option) {
    switch (option) {
        case '1':
            console.log('You selected To Create New Project');
            const destinationDirExists = isExist();
            if (destinationDirExists) {
            
            // Prompt the user for confirmation
            console.log('The destination directory already exists. PLEASE NOTE SAVE DATA WILL BE LOST ');
            rl.question('Do you want to copy directories and create a symlink? (yes/no): ', (answer) => {
                if (answer.toLowerCase() === 'yes') {
                copyDirectoriesAndCreateSymlink();
                } else {
                console.log('Operation canceled. No directories were copied.');
                
                }
                rl.close();
            });

            } else {
            // If the destination directory doesn't exist, proceed without asking for confirmation
            copyDirectoriesAndCreateSymlink();
            }
            break;

        case '2':
            console.log('Creating Gulp Link');
            createSymLink();
            console.log('exit');
            rl.close();
            break;

        case '3':

            break;

        case '4':
            console.log('Removing Gulp Link ');
            removeSymLink() 
            console.log('exit');
            rl.close();
            break;
       
        case '5':
            console.log('Goodbye!');
            rl.close();
            break;
        default:
            console.log('Invalid option. Please select a valid option.');
            break;
    }
  }
  
  function getMenuChoice() {

    rl.question('Enter the number of your choice: ',  handleOption);


  }

  // Start the menu
displayMenu();
getMenuChoice();