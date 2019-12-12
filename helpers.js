const fs = require("fs");

const createFileIfNotExists = (path, cb) => {
  fs.access(path, fs.constants.F_OK, err => {
    if (err) {
      fs.writeFile(path, "", { flag: "w" }, cb);
    } else {
      cb();
    }
  });
};

const readFile = (path, cb) => {
  fs.readFile(path, (err, data) => cb(data));
};

const appendToFile = (path, data, cb) => {
  fs.appendFile(path, data, cb);
};

module.exports = { createFileIfNotExists, readFile, appendToFile };
