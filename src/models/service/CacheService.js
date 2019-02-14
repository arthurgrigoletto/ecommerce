const fs = require('fs');

module.exports = {
  createCacheFolders() {
    if (!fs.existsSync('./tmp')) {
      fs.mkdirSync('./tmp');
    }

    if (!fs.existsSync('./tmp/uploads')) {
      fs.mkdirSync('./tmp/uploads');
    }
  },
};
