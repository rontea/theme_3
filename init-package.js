'use strict';

const fs = require('fs-extra');
const path = require('path');

const source = path.resolve(__dirname, '..', '..', 'node_modules', 'theme_3_v1', 'project_src');
const destination = path.resolve(__dirname, '..', '..');

console.log('===========================');
console.log('Execute path copy');
console.log('Path Information');
console.log('Destination: ' + destination);
console.log('Source: ' + source);
console.log('===========================');

const directories = [
  'html',
  'src'
];

directories.forEach((directoryName) => {
  const sourceDir = path.join(source, directoryName);
  const destinationDir = path.join(destination, directoryName);

  if (fs.existsSync(destinationDir) && fs.lstatSync(destinationDir).isDirectory()) {
    console.log(`Directory '${directoryName}' already exists outside directory.`);
  } else {
    fs.copy(sourceDir, destinationDir, (err) => {
      if (err) {
        console.error(`Error copying directory '${directoryName}':`, err);
      } else {
        console.log(`Directory '${directoryName}' copied successfully.`);
      }
    });
  }
});

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
  console.log('Symlink already exists.');
}
