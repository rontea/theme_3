'use strict';

const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const source = path.resolve(__dirname, '..', '..', 'node_modules', 'theme_3_v1', 'project_src');
const sourceSymLink = path.resolve(__dirname, '..', '..', 'node_modules', 'theme_3_v1');
const destination = path.resolve(__dirname, '..', '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


/** Check DIR */

function checkFolderContents(directory) {
  console.log(destination);
  console.log(source);

  const sourceFiles = fs.readdirSync(source);
  const destFiles = fs.readdirSync(destination);

  fs.readdirSync(directory).forEach(file => {

    const filePath = path.join(directory, file);
    console.log(filePath);

  });

  const missingInDestination = sourceFiles.filter(file => !destFiles.includes(file));
  console.log(missingInDestination);

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directory}: ${err}`);
      return;
    }

    // Check if 'html' and 'src' folders exist in the current directory
    if (files.includes('html') && files.includes('src')) {
      console.log(`Both 'html' and 'src' folders found in: ${directory}`);
      console.log(`Begin checking on ${directory}`);
       
          // Compare the files in the source and destination folders
          if (missingInDestination.length > 0) {
            console.log('Files missing in the destination folder:');
            missingInDestination.forEach(file => {
              console.log(file);
            });
          } else {
            console.log('No missing files found.');
          }
        

    } else {
      console.log(`'html' or 'src' folder missing in: ${directory}`);
      console.log(`init copy of ${directory}`);
      copyDirectories();
    }

  });
}

/** Create new Project */

function createNewProject() {
  console.log(`destination folder  ${destination} `);
  console.log(`source folder  ${source} `);

  
  fs.readdir(destination, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${destination}: ${err}`);
      return;
    }

    if (files.includes('html') && files.includes('src')) { 
      console.log(`Both 'html' and 'src' folders found in: ${destination}`);
      console.log('use update option');
    }else {
      console.log(`'html' or 'src' folder missing in: ${destination}`);
      console.log(`init copy of ${destination}`);
      copyDirectories();
      createSymLink();
    }
  });
}

/** Copy missing files  */

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

function copyDirectories() {
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
}

/** Copy file */

function copyFile(filename){

  // Define the paths for the source file and the destination file
const sourceFilePath = source + filename;
const destinationFilePath = destination + filename;

console.log(sourceFilePath);

}

/** Create symlink */

function createSymLink(){
    /**
     * Symlink
     */
  
    const sourcePath = path.join(sourceSymLink , 'gulpfile.js');
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
      console.log('link was not copied!! already exists!!.');
    }
}

/** remove Symlink */

function removeSymLink() {

    const symlinkPath = path.join(destination, 'gulpfile.js');
    console.log(symlinkPath);

    if (fs.existsSync(symlinkPath)) {
       
      fs.unlink(symlinkPath, (err) => {
          if (err) {
            console.error(`Error removing symlink: ${err}`);
          } else {
            console.log('Symlink removed successfully.');
          }
      });
        
    }else {
        console.log("Gulp link has not been created yet");
    }
   

}

function handleOption(option) {
    switch (option) {
        case '1':
            console.log('You selected To Create New Project');
            createNewProject();

            rl.close();
            break;

        case '2':
            console.log('Creating Gulp Link');
            createSymLink();
            console.log('Exit');
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
            rl.close();
            break;
    }
  }
  
  function getMenuChoice() {

    rl.question('Enter the number of your choice: ',  handleOption);


  }

  // Start the menu
displayMenu();
getMenuChoice();