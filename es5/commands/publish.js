'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var execute = exports.execute = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(sqlFileList, connection) {
    var _this = this;

    var connectionPool, config, _config, files, rootFolder;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return configService.getConnectionPool(connection);

          case 2:
            connectionPool = _context2.sent;

            //
            config = void 0;

            try {
              config = require(process.cwd() + '/' + sqlFileList).default;
            } catch (error) {
              out.error(error);
              out.error('Could not find file: ' + process.cwd() + '/' + sqlFileList);
            }

            _config = config;
            files = _config.files;
            rootFolder = _config.rootFolder;
            _context2.prev = 8;
            _context2.next = 11;
            return utils.asyncMap(function () {
              var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(file) {
                var filePath, statements;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        filePath = rootFolder ? rootFolder + '/' + file : file;
                        statements = parser.getStatementsFromFile(filePath);

                        out.info(file);
                        _context.next = 5;
                        return sqlExec.executeStatements(connectionPool, statements);

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x3) {
                return ref.apply(this, arguments);
              };
            }(), files);

          case 11:
            return _context2.abrupt('return', 'done');

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2['catch'](8);

            out.error(_context2.t0);
            throw _context2.t0;

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[8, 14]]);
  }));

  return function execute(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var out = require('../services/loggingService.js');
var configService = require('../services/configService.js');
var parser = require('../services/sqlParserService.js');
var sqlExec = require('../services/sqlExecutingService.js');
var utils = require('../services/utilsService.js');
