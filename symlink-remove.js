const fs = require('fs');
const path = require('path');

const symlinkPath = './'; // Replace with the actual path to the symlink

fs.unlink(symlinkPath, (err) => {
  if (err) {
    console.error('Error removing symlink:', err);
  } else {
    console.log('Symlink removed successfully.');
  }
});