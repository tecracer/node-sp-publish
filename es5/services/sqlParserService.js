'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatementsFromFile = getStatementsFromFile;
exports.splitBatches = splitBatches;
var fs = require('fs');

function getStatementsFromFile(filepath) {
  var statements = [];
  var content = fs.readFileSync(filepath, 'utf8');
  statements = splitBatches(content);
  return statements;
}

function splitBatches(sql) {
  var result = [];
  result = result.concat(sql.split(/\bGO[;\n]?\s*/ig));
  for (var i = 0; i < result.length; i++) {
    var dropProcedureRegex = /(DROP (PROCEDURE|FUNCTION).*)/ig;
    if (dropProcedureRegex.test(result[i])) {
      var origDropText = result[i];
      var findWrappedRegex = /BEGIN\s*(DROP (PROCEDURE|FUNCTION).*)/ig;
      if (!findWrappedRegex.test(origDropText)) {
        var schemaTableName = /(FUNCTION|PROCEDURE)\s*\[?(\w*)\]?\.\[?(\w*)/i.exec(origDropText);
        result[i] = result[i].replace(dropProcedureRegex, "IF EXISTS(SELECT name FROM sys.objects WHERE name = '" + schemaTableName[3] + "') BEGIN DROP " + schemaTableName[1] + " " + schemaTableName[2] + "." + schemaTableName[3] + "; END");
      }
    }
    if (/^\s*$/.test(result[i])) {
      result.splice(i, 1);
    }
  }

  return result;
}