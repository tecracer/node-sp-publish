var out = require('./loggingHelper.js');
var configService = require('./config.js');

module.exports = {
  execute: function(configuration) {
    out.explain('Here is all we can find: ')
    var configs = configService.getConfig();
    var foundSomething = false;
    configs.then(function(configs){
      for(var i = 0; i < configs.length; i++){
        if(configs[i].name == configuration){
          foundSomething = true;
          out.log('Name: ' + configs[i].name);
          out.log('Server: ' + configs[i].server);
          out.log('Sql-Files:');
          out.log('dir: ' + configs[i].sql.rootFolder);
          for(var j = 0; j < configs[i].sql.files.length; j++){
            out.log("      " + configs[i].sql.files[j]);
          }
          out.info("HINT: The order of the Sql-Files is the executing order.");
        };
      }
      if(!foundSomething){
        out.log("Too bad, we couldn't find a matching configuration.");
        out.log("Maybe you have a spelling misstake.");
        out.info("HINT: The configuration name is Casesensitive.");
      }
    })
    .catch(function(err){
      out.error(err);
    })

  }
}
