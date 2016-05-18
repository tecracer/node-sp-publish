#! /usr/bin/env node
require('babel-core');
require('babel-polyfill');
require("babel-core/register");

var publish = require('./commands/publish.js');
var pkg = require('./package.json');
var program = require('commander');

program
  .version(pkg.version)
  .usage('[options] <file>')
  .option('-d, --dbName [dbName]', '')
  .option('-s, --dbServer [dbServer]', '')
  .option('-u, --dbUser [dbUser]', '')
  .option('-p, --dbPassword [dbPassword]', '');

program
  .command('publish')
  .description('publishes the specified configuration')
  .action(function(file) {
    var filename = file || 'procedures.js';
    var connection = {
      name: program.dbName,
      server: program.dbServer,
      user: program.dbUser,
      password: program.dbPassword
    };
    if (filename) {
      publish.execute(filename, connection)
      .then(function(arg){
        console.log(arg);
        process.exit(1);
      })
      .catch(function(error){
        console.log(error);
      });
    } else {
      console.log('Not all required information is available.');
    }
  });

program.parse(process.argv);
