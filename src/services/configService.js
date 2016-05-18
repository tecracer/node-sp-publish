var out = require('./loggingService.js');
var rl = require('readline-sync');
var sql = require('mssql');

export async function getConnectionPool(connection){
  let completeConnection = {
    database: connection.name || rl.question('Please enter the name of ' +
    'the database: ', { hideEchoBack: false }),
    server: connection.server || rl.question('Please enter the address of ' +
    'the database server: ', { hideEchoBack: false }),
    user: connection.user || rl.question('Please enter the name of ' +
    'the database user: ', { hideEchoBack: false }),
    password: connection.password || rl.question('Please enter the password of ' +
    'the database user: ', { hideEchoBack: true })
  };

  let connectionPool = new sql.Connection(completeConnection);
  await connectionPool.connect();
  return connectionPool;
}
