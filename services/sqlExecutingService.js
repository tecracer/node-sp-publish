var out = require('./loggingService');
var sql = require('mssql');

module.exports = {
  executeStatements: function(config, statements) {
    return new Promise(function(resolve, reject) {
      if (statements.length === 0) {
        resolve('Done');
      } else {
        sql.connect(config)
        .then(function() {
          // out.debug(statements[0]);
          // out.log('------------------------------------------------');
          new sql.Request(config)
          .query(statements[0])
          .then(function() {
            statements.splice(0, 1);
            module.exports.executeStatements(config, statements)
            .then(function(res) {
              resolve(res);
            })
            .catch(function(err) {
              reject(err);
            });
          })
          .catch(function(err) {
            out.error(err);
            reject(err);
          });
        })
        .catch(function(err) {
          out.error(err);
          reject(err);
        });
      }
    });
  }
};
