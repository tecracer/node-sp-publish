"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var asyncMap = exports.asyncMap = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(asyncFun, arr) {
    var i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < arr.length)) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return asyncFun(arr[i]);

          case 4:
            i++;
            _context.next = 1;
            break;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function asyncMap(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }