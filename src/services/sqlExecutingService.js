var out = require('./loggingService');
var sql = require('mssql');

export async function executeStatements(connectionPool, statements){
  if (statements.length === 0) {
    return 'done';
  }

  await statements.map(async (statement) => {
    await new sql.Request(connectionPool).query(statement);
    return;
  });
  return 'done';
}
