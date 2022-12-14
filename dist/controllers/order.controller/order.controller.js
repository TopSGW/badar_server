"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _check = require("express-validator/check");

var _order = _interopRequireDefault(require("../../models/order.model/order.model"));

var _user = _interopRequireDefault(require("../../models/user.model/user.model"));

var _CheckMethods = require("../../helpers/CheckMethods");

var _ApiError = _interopRequireDefault(require("../../helpers/ApiError"));

var _i18n = _interopRequireDefault(require("i18n"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// import config from '../../config';
var isBanded = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].findOne({
              _id: id
            }, "banded");

          case 2:
            user = _context.sent;
            return _context.abrupt("return", user.banded);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isBanded(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  validateAddorder: function validateAddorder() {
    var validations = [(0, _check.body)('customer_id').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('products').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  addorder: function addorder(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var validatedBody, query, ord;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              query = _objectSpread(_objectSpread({}, validatedBody), {}, {
                status: "ACCEPTED",
                paymentMethod: "CREDIT",
                paymentStatus: "SUCCESSED"
              });
              _context2.next = 5;
              return _order["default"].create(query);

            case 5:
              ord = _context2.sent;
              res.status(200).send(ord);
              _context2.next = 13;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              next(_context2.t0);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }))();
  },
  getUserorder: function getUserorder(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var query, _req$query, userId, carId, ordr;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              query = {
                deleted: false,
                stat: {
                  $in: ["WAITTING", "ACCEPTED"]
                }
              };
              _req$query = req.query, userId = _req$query.userId, carId = _req$query.carId;

              if (userId >= 0) {
                query.userId = userId;
              }

              if (carId >= 0) {
                query.carId = carId;
              }

              _context3.next = 7;
              return order.find(query).populate([{
                path: userId ? 'carId' : 'userId',
                populate: {
                  path: "TripId",
                  model: carId ? "onlineMsfr" : "onlineCar"
                }
              }]);

            case 7:
              ordr = _context3.sent;
              res.status(200).send(ordr);
              _context3.next = 15;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              next(_context3.t0);

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 11]]);
    }))();
  },
  getOrders: function getOrders(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var user, itemGroups, id;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              user = req.user;
              itemGroups = {};

              if (req.query.id) {
                _context4.next = 9;
                break;
              }

              _context4.next = 6;
              return _order["default"].find({
                deleted: false
              }).populate('products.product').populate('customer_id');

            case 6:
              itemGroups = _context4.sent;
              _context4.next = 13;
              break;

            case 9:
              id = req.query.id;
              _context4.next = 12;
              return _order["default"].findOne({
                _id: id,
                deleted: false
              }).populate('products.product').populate('customer_id');

            case 12:
              itemGroups = _context4.sent;

            case 13:
              res.status(200).send(itemGroups);
              _context4.next = 19;
              break;

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](0);
              next(_context4.t0);

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 16]]);
    }))();
  }
};
exports["default"] = _default;