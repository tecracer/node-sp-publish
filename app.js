#! /usr/bin/env node

var _ = require('underscore');
var list = require('./commands/list.js');
var show = require('./commands/show.js');
var publish = require('./commands/publish.js');
var program = require('commander');

program
  .version('0.0.1')

program
  .command('publish <configuration>')
  .description('publishes the specified configuration')
  .action(function(configuration){
    publish.execute(configuration)
  });

program
  .command('show <configuration>')
  .description('shows the specified configuration')
  .action(function(configuration){
    show.execute(configuration)
  });

program
  .command('list')
  .description('lists all known configurations')
  .action(function(){
    list.execute()
  });

program.parse(process.argv);
