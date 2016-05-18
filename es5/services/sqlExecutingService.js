'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var executeStatements = exports.executeStatements = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(connectionPool, statements) {
    var _this = this;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(statements.length === 0)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt('return', 'done');

          case 2:
            _context2.next = 4;
            return statements.map(function () {
              var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(statement) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return new sql.Request(connectionPool).query(statement);

                      case 2:
                        return _context.abrupt('return');

                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x3) {
                return ref.apply(this, arguments);
              };
            }());

          case 4:
            return _context2.abrupt('return', 'done');

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function executeStatements(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var out = require('./loggingService');
var sql = require('mssql');