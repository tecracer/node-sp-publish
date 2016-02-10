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
    result = result.concat(sql.split(/GO;?/ig));
    for (var i = 0; i < result.length; i++) {
      if (/^\s*$/.test(result[i])) {
        result.splice(i, 1);
      }
    }

    return result;
  }
};
