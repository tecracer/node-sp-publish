var out = require('./loggingHelper.js');
var configService = require('./config.js');

module.exports = {
  execute: function(configuration) {
    out.explain('Publishing the configuration: ' + configuration)
    var configs = configService.getConfig();
    configs.then(function(configs){
      for(var i = 0; i < configs.length; i++){
        if(configs[i].Name == configuration){
          out.info(configs[i]);
        };
      }
    })
    .catch(function(err){
      out.error(err);
    })

  }
}
