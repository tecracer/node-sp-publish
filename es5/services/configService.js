'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var getConnectionPool = exports.getConnectionPool = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(connection) {
    var completeConnection, connectionPool;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            completeConnection = {
              database: connection.name || rl.question('Please enter the name of ' + 'the database: ', { hideEchoBack: false }),
              server: connection.server || rl.question('Please enter the address of ' + 'the database server: ', { hideEchoBack: false }),
              user: connection.user || rl.question('Please enter the name of ' + 'the database user: ', { hideEchoBack: false }),
              password: connection.password || rl.question('Please enter the password of ' + 'the database user: ', { hideEchoBack: true })
            };
            connectionPool = new sql.Connection(completeConnection);
            _context.next = 4;
            return connectionPool.connect();

          case 4:
            return _context.abrupt('return', connectionPool);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getConnectionPool(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var out = require('./loggingService.js');
var rl = require('readline-sync');
var sql = require('mssql');