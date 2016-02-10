var out = require('../services/loggingService.js');
var configService = require('../services/configService.js');
var parser = require('../services/sqlParserService.js');
var rl = require('readline-sync');
var sqlExec = require('../Services/sqlExecutingService.js');

module.exports = {
  execute: function(configuration, path) {
    out.explain('Publishing the configuration: ' + configuration);
    configService.getConfig(configuration, path)
    .then(function(config) {
      var files = configService.getAllFilesFromConfig(config);
      var server = configService.getServerFromConfig(config);
      var enteredPassword = rl.question('Please enter the password of ' +
      'the database user: ' + server.user + ': ', {
        hideEchoBack: true
      });
      var sqlConfig = {
        user: server.user,
        server: server.server,
        database: server.database,
        password: enteredPassword
      };
      module.exports._executeFiles(files, sqlConfig)
      .then(function(res) {
        out.info('Congrats we are done.', res);
      })
      .catch(function(err) {
        out.error(err);
      });
    })
    .catch(function(err) {
      out.error(err);
    });
  },
  _executeFiles: function(files, sqlConfig) {
    return new Promise(function(resolve, reject) {
      // out.debug(files);
      if (files.length === 0) {
        resolve('Done');
      } else {
        var statements = parser.getStatementsFromFile(files[0]);
        out.info(files[0]);
        sqlExec.executeStatements(sqlConfig, statements)
        .then(function(res) {
          out.log(res);
          files.splice(0, 1);
          module.exports._executeFiles(files, sqlConfig)
          .then(function(res) {
            resolve(res);
          })
          .catch(function(err) {
            reject(err);
          });
        })
        .catch(function(err) {
          out.error(err);
          files.splice(0, 1);
          module.exports._executeFiles(files, sqlConfig)
          .then(function(res) {
            resolve(res);
          })
          .catch(function(err) {
            reject(err);
          });
        });
      }
    });
  }
};
