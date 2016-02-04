var out = require('./loggingHelper.js');
var configService = require('./config.js');

module.exports = {
  execute: function() {
    out.explain('These are all known configurations. ');
    out.explain('You can add new configurations, by adjusting the config.json');
    var configs = configService.getConfig();
    configs.then(function(configs){
      for(var i = 0; i < configs.length; i++){
        out.info(configs[i].Name);
      }
    })
    .catch(function(err){
      out.error(err);
    })

  }
}
