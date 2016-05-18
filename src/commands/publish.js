var out = require('../services/loggingService.js');
var configService = require('../services/configService.js');
var parser = require('../services/sqlParserService.js');
var sqlExec = require('../Services/sqlExecutingService.js');
var utils = require('../Services/utilsService.js');

export async function execute(sqlFileList, connection) {
  // check if all connection params are filled and read them from console if Not
  var connectionPool = await configService.getConnectionPool(connection);
  //
  let config;
  try{
    config = require(process.cwd() +'/'+ sqlFileList).default;
  }
  catch(error){
    out.error(error);
    out.error('Could not find file: ' + process.cwd() +'/'+ sqlFileList);
  }

  let { files, rootFolder } = config;
  try {
      await utils.asyncMap(async (file) => {
        let filePath = rootFolder ? rootFolder + '/' + file : file;
        let statements = parser.getStatementsFromFile(filePath);
        out.info(file);
        await sqlExec.executeStatements(connectionPool, statements);
      }, files)

    return 'done';
  }
  catch(error){
    out.error(error);
    throw error;
  }
}
