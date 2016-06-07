var out = require('./loggingService');
var sql = require('mssql');
var utils = require('./utilsService');

export async function executeStatements(connectionPool, statements){
  if (statements.length === 0) {
    return 'done';
  }

  await utils.asyncMap(async (statement) => {
    await new sql.Request(connectionPool).query(statement);
  }, statements);

  return 'done';
}
