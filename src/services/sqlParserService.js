var fs = require('fs');

export function getStatementsFromFile(filepath) {
  var content = fs.readFileSync(filepath, 'utf8');
  return splitBatches(content);
}

export function splitBatches(sql) {
  return sql.split(/\bGO;?\s*/ig).filter(batch => !/^\s*$/.test(batch));
}
