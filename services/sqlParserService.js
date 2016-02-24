var fs = require('fs');

module.exports = {
  getStatementsFromFile: function(filepath) {
    var statements = [];
    var content = fs.readFileSync(filepath, 'utf8');
    statements = module.exports.splitBatches(content);
    return statements;
  },
  splitBatches: function(sql) {
    var result = [];
    result = result.concat(sql.split(/\bGO[;\n]/ig));
    for (var i = 0; i < result.length; i++) {
      var dropProcedureRegex = /(DROP PROCEDURE.*)/ig;
      if (dropProcedureRegex.test(result[i])) {
        var origDropText = result[i];
        console.log(origDropText);
        var schemaTableName = /\[?(\w*)\]?\.\[?(\w*)/i.exec(origDropText);
        result[i] = result[i].replace(dropProcedureRegex, "IF EXISTS(SELECT name FROM sys.objects WHERE name = '" +
        schemaTableName[2] + "') BEGIN DROP PROCEDURE " + schemaTableName[1] + "." + schemaTableName[2] + "; END" )
        console.log('NEU: ' + result[i]);
      }
      if (/^\s*$/.test(result[i])) {
        result.splice(i, 1);
      }
    }

    return result;
  }
};
/*
IF EXISTS(SELECT name FROM sys.objects WHERE name = 'updateMeal')
    BEGIN
        DROP PROCEDURE SYSADM.updateMeal;
    END
GO

DROP PROCEDURE dbo.deleteAllTables;
GO;
*/
