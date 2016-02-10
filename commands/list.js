var out = require('../services/loggingService.js');
var configService = require('../services/configService.js');

module.exports = {
  execute: function() {
    out.explain('These are all known configurations. ');
    out.explain('You can add new configurations, by adjusting the config.json');
    var configs = configService.getConfig();
    configs.then(function(configs){
      for(var i = 0; i < configs.length; i++){
        out.log("" + configs[i].name);
      }
    })
    .catch(function(err){
      out.error(err);
    })

  }
}
