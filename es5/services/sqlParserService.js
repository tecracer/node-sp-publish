'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatementsFromFile = getStatementsFromFile;
exports.splitBatches = splitBatches;
var fs = require('fs');

function getStatementsFromFile(filepath) {
  var content = fs.readFileSync(filepath, 'utf8');
  return splitBatches(content);
}

function splitBatches(sql) {
  return sql.split(/\bGO;?\s*/ig).filter(function (batch) {
    return !/^\s*$/.test(batch);
  });
}