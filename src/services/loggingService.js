var color = require('colors');

module.exports = {
  info: function(text) {
    console.log(color.yellow(text));
  },
  debug: function(text) {
    console.log(color.blue(text));
  },
  error: function(text) {
    console.log(color.red(text));
  },
  explain: function(text) {
    console.log(color.green(text));
  },
  log: function(text) {
    console.log(text);
  }
};
