"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _CheckMethods = require("../../helpers/CheckMethods");

var _user = _interopRequireDefault(require("../../models/user.model/user.model"));

var _customer = _interopRequireDefault(require("../../models/customer.model/customer.model"));

var _check = require("express-validator/check");

var _i18n = _interopRequireDefault(require("i18n"));

var _ApiError = _interopRequireDefault(require("../../helpers/ApiError"));

var _ApiResponse = _interopRequireDefault(require("../../helpers/ApiResponse"));

var _default = {
  validate: function validate() {
    var validations = [(0, _check.body)('id').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('email').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('phone').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('address').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  create: function create(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var validation, item, newGroupUnit;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              validation = (0, _CheckMethods.checkValidations)(req);
              console.log(validation);
              console.log(req.body);

              if (!validation.id) {
                _context.next = 10;
                break;
              }

              _context.next = 7;
              return _customer["default"].updateOne({
                _id: validation.id
              }, {
                $set: {
                  name: validation.name,
                  email: validation.email,
                  phone: validation.phone,
                  address: validation.address
                }
              }, {
                upsert: true
              }, function (err, doc) {
                if (err) return res.send(500, {
                  error: err
                });
                return res.status(200).send(item);
              });

            case 7:
              item = _context.sent;
              _context.next = 14;
              break;

            case 10:
              _context.next = 12;
              return _customer["default"].create({
                _id: false,
                name: validation.name,
                email: validation.email,
                phone: validation.phone,
                address: validation.address
              });

            case 12:
              newGroupUnit = _context.sent;
              res.status(200).send(newGroupUnit);

            case 14:
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              next(_context.t0);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 16]]);
    }))();
  },
  getCustomers: function getCustomers(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var user, itemGroups, id;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              user = req.user;
              itemGroups = {};

              if (req.query.id) {
                _context2.next = 9;
                break;
              }

              _context2.next = 6;
              return _customer["default"].find({
                deleted: false
              }).populate('user_id');

            case 6:
              itemGroups = _context2.sent;
              _context2.next = 13;
              break;

            case 9:
              id = req.query.id;
              _context2.next = 12;
              return _customer["default"].findOne({
                _id: id,
                deleted: false
              }).populate('user_id');

            case 12:
              itemGroups = _context2.sent;

            case 13:
              res.status(200).send(itemGroups);
              _context2.next = 19;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](0);
              next(_context2.t0);

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 16]]);
    }))();
  },
  "delete": function _delete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              if (!req.query.id) {
                _context3.next = 6;
                break;
              }

              _context3.next = 4;
              return _customer["default"].updateOne({
                _id: req.query.id
              }, {
                $set: {
                  deleted: true
                }
              }, {
                upsert: true
              }, function (err, doc) {
                if (err) return res.send(500, {
                  error: err
                });
                return res.status(200).send({
                  success: true
                });
              });

            case 4:
              _context3.next = 7;
              break;

            case 6:
              next("delete items group error");

            case 7:
              _context3.next = 12;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              next(_context3.t0);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }))();
  }
};
exports["default"] = _default;