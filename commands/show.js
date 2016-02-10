var out = require('../services/loggingService.js');
var configService = require('../services/configService.js');

module.exports = {
  execute: function(configuration) {
    out.explain('Here is what we found: ');
    var configs = configService.getConfig(configuration);
    configs.then(function(config) {
      out.log('Name: ' + config.name);
      var server = configService.getServerFromConfig(config);
      out.log('Server: ' + server.server);
      out.log('Database: ' + server.database);
      out.log('User: ' + server.user);
      out.log('Sql-Files:');
      var files = configService.getAllFilesFromConfig(config);
      for (var j = 0; j < files.length; j++) {
        out.log(files[j]);
      }
      out.info('HINT: The order of the Sql-Files is the executing order.');
    })
    .catch(function(err) {
      out.error(err);
    });
  }
};
