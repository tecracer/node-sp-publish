#! /usr/bin/env node
var list = require('./commands/list.js');
var show = require('./commands/show.js');
var publish = require('./commands/publish.js');
var program = require('commander');

program
  .version('0.0.1')
  .usage('[options] <file>')
  .option('-f, --filename [filename]', 'Choose the filename of ' +
  'your config if it is not following the default sp-publish.json');

program
  .command('publish [configuration]')
  .description('publishes the specified configuration')
  .action(function(configuration) {
    if (program.path) {
      publish.execute(configuration, program.path);
    } else {
      publish.execute(configuration);
    }
  });

program
  .command('show [configuration]')
  .description('shows the specified configuration')
  .action(function(configuration) {
    if (program.path) {
      show.execute(configuration, program.path);
    } else {
      show.execute(configuration);
    }
  });

program
  .command('list')
  .description('lists all known configurations')
  .action(function() {
    if (program.path) {
      list.execute(program.path);
    } else {
      list.execute();
    }
  });

program.parse(process.argv);
