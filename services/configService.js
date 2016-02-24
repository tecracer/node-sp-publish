var jsf = require('jsonfile');
var out = require('./loggingService.js');

module.exports = {
  getConfig: function(configuration, filename) {
    var defaultFilename = 'sp-publish.json';
    if (!filename) {
      filename = defaultFilename;
    }
    var pathToFile = process.cwd() + '/' + filename;

    return new Promise(function(resolve, reject) {
      jsf.readFile(pathToFile, function(err, configs) {
        if (err) {
          out.error(err);
          reject(err);
        }
        var foundSomething = false;
        for (var i = 0; i < configs.length; i++) {
          if (configs[i].name === configuration) {
            foundSomething = true;
            resolve(configs[i]);
          }
        }
        if (!foundSomething) {
          reject('Couldn\'t find the configuration \'' + configuration + '\'');
        }
      });
    });
  },
  getAllConfigs: function() {
    var filename = 'sp-publish.json';
    var pathToFile = process.cwd() + '/' + filename;
    return new Promise(function(resolve, reject) {
      jsf.readFile(pathToFile, function(err, configs) {
        resolve(configs);
        if (err) {
          reject(err);
        }
      });
    });
  },
  getAllFilesFromConfig: function(config) {
    var files = [];
    for (var j = 0; j < config.sql.files.length; j++) {
      var pathToFile = config.sql.rootFolder + '/' + config.sql.files[j];
      files.push(pathToFile);
    }
    return files;
  },
  getServerFromConfig: function(config) {
    return {
      server: config.server.server,
      database: config.server.database,
      user: config.server.user
    };
  }
};
