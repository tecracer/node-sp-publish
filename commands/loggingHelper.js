var color = require('colors');
module.exports = {
  info: function(text){
    console.log(text.yellow);
  },
  debug: function(text){
    console.log(text.blue);
  },
  error: function(text){
    console.log(text.red);
  },
  explain: function(text){
    console.log(text.green);
  },
  log: function(text){
    console.log(text);
  }
}
