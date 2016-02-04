var jsf = require('jsonfile');

module.exports = {
  getConfig: function() {
    return new Promise(function(resolve, reject){
      jsf.readFile('./config.json', function(err, configs) {
        resolve(configs);
        if(err){
          reject(err);
        }
      });
    })
  }
}
