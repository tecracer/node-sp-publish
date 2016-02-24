var out = require('../services/loggingService.js');
var configService = require('../services/configService.js');

module.exports = {
  execute: function() {
    out.explain('These are all known configurations. ');
    out.explain('You can add new configurations, by adjusting the sp-publish.json');
    var configs = configService.getAllConfigs();
    configs.then(function(configs) {
      for (var i = 0; i < configs.length; i++) {
        out.log(String(configs[i].name));
      }
    })
    .catch(function(err) {
      out.error(err);
    });
  }
};
