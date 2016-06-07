'use strict';

var color = require('colors');

module.exports = {
  info: function info(text) {
    console.log(color.yellow(text));
  },
  debug: function debug(text) {
    console.log(color.blue(text));
  },
  error: function error(text) {
    console.log(color.red(text));
  },
  explain: function explain(text) {
    console.log(color.green(text));
  },
  log: function log(text) {
    console.log(text);
  }
};