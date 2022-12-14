"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../models/user.model/user.model"));

var _system_info = _interopRequireDefault(require("../../models/system_info.model/system_info.model"));

var _items_group = _interopRequireDefault(require("../../models/settings.model/items_group.model"));

var _items_category = _interopRequireDefault(require("../../models/settings.model/items_category.model"));

var _units = _interopRequireDefault(require("../../models/settings.model/units.model"));

var _purity = _interopRequireDefault(require("../../models/settings.model/purity.model"));

var _payment_method = _interopRequireDefault(require("../../models/settings.model/payment_method.model"));

var _order_status = _interopRequireDefault(require("../../models/settings.model/order_status.model"));

var _ApiResponse = _interopRequireDefault(require("../../helpers/ApiResponse"));

var _CheckMethods = require("../../helpers/CheckMethods");

var _check = require("express-validator/check");

var _i18n = _interopRequireDefault(require("i18n"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// import config from '../../config'
var populateQuery = [{
  path: 'user',
  model: 'user'
}];
var _default = {
  validateSystemInfo: function validateSystemInfo() {
    var validations = [(0, _check.body)('app_name').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('phone').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('city').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('region').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('zip').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('address').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('vat').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('vat_number').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('commission').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('currency').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('logo').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  updateSystemInfo: function updateSystemInfo(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var validation, to_return;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              validation = (0, _CheckMethods.checkValidations)(req);
              console.log(validation);
              _context.next = 5;
              return _system_info["default"].findOneAndUpdate({}, _objectSpread({}, validation), {
                "new": true
              });

            case 5:
              to_return = _context.sent;
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              next(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }))();
  },
  getSystemInfo: function getSystemInfo(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var user, system;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              user = req.user;
              _context2.next = 4;
              return _system_info["default"].findOne();

            case 4:
              system = _context2.sent;
              console.log(system);
              res.status(200).send(system);
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              next(_context2.t0);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }))();
  },
  validateItemGroup: function validateItemGroup() {
    var validations = [(0, _check.body)('id').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_ar').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_en').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  itemGroup: function itemGroup(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var validation, item, newGroupUnit;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              validation = (0, _CheckMethods.checkValidations)(req);
              console.log(validation);
              console.log(req.body);

              if (!validation.id) {
                _context3.next = 10;
                break;
              }

              _context3.next = 7;
              return _items_group["default"].updateOne({
                _id: validation.id
              }, {
                $set: {
                  name_ar: validation.name_ar,
                  name_en: validation.name_en
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
              item = _context3.sent;
              _context3.next = 14;
              break;

            case 10:
              _context3.next = 12;
              return _items_group["default"].create({
                _id: false,
                name_ar: validation.name_ar,
                name_en: validation.name_en
              });

            case 12:
              newGroupUnit = _context3.sent;
              res.status(200).send(newGroupUnit);

            case 14:
              _context3.next = 19;
              break;

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](0);
              next(_context3.t0);

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 16]]);
    }))();
  },
  getItemGroup: function getItemGroup(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var user, itemGroups;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              user = req.user;
              _context4.next = 4;
              return _items_group["default"].find({
                deleted: false
              });

            case 4:
              itemGroups = _context4.sent;
              res.status(200).send(itemGroups);
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              next(_context4.t0);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 8]]);
    }))();
  },
  validateDelItemGroup: function validateDelItemGroup() {
    var validations = [(0, _check.body)('id').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  delItemGroup: function delItemGroup(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;

              if (!req.query.id) {
                _context5.next = 6;
                break;
              }

              _context5.next = 4;
              return _items_group["default"].updateOne({
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
              _context5.next = 7;
              break;

            case 6:
              next("delete items group error");

            case 7:
              _context5.next = 12;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              next(_context5.t0);

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
    }))();
  },
  validateItemCategory: function validateItemCategory() {
    var validations = [(0, _check.body)('id').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_ar').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_en').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  itemCategory: function itemCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var validation, item, newGroupUnit;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              validation = (0, _CheckMethods.checkValidations)(req);
              console.log(validation);
              console.log(req.body);

              if (!validation.id) {
                _context6.next = 10;
                break;
              }

              _context6.next = 7;
              return _items_category["default"].updateOne({
                _id: validation.id
              }, {
                $set: {
                  name_ar: validation.name_ar,
                  name_en: validation.name_en
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
              item = _context6.sent;
              _context6.next = 14;
              break;

            case 10:
              _context6.next = 12;
              return _items_category["default"].create({
                _id: false,
                name_ar: validation.name_ar,
                name_en: validation.name_en
              });

            case 12:
              newGroupUnit = _context6.sent;
              res.status(200).send(newGroupUnit);

            case 14:
              _context6.next = 19;
              break;

            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6["catch"](0);
              next(_context6.t0);

            case 19:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 16]]);
    }))();
  },
  getItemCategory: function getItemCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var user, itemGroups;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              user = req.user;
              _context7.next = 4;
              return _items_category["default"].find({
                deleted: false
              });

            case 4:
              itemGroups = _context7.sent;
              res.status(200).send(itemGroups);
              _context7.next = 11;
              break;

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](0);
              next(_context7.t0);

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 8]]);
    }))();
  },
  validateDelItemCategory: function validateDelItemCategory() {
    var validations = [(0, _check.body)('id').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  delItemCategory: function delItemCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;

              if (!req.query.id) {
                _context8.next = 6;
                break;
              }

              _context8.next = 4;
              return _items_category["default"].updateOne({
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
              _context8.next = 7;
              break;

            case 6:
              next("delete items group error");

            case 7:
              _context8.next = 12;
              break;

            case 9:
              _context8.prev = 9;
              _context8.t0 = _context8["catch"](0);
              next(_context8.t0);

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 9]]);
    }))();
  },
  validatePurity: function validatePurity() {
    var validations = [(0, _check.body)('id').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_ar').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_en').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  purity: function purity(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var validation, item, newGroupUnit;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              validation = (0, _CheckMethods.checkValidations)(req);
              console.log(validation);
              console.log(req.body);

              if (!validation.id) {
                _context9.next = 10;
                break;
              }

              _context9.next = 7;
              return _purity["default"].updateOne({
                _id: validation.id
              }, {
                $set: {
                  name_ar: validation.name_ar,
                  name_en: validation.name_en
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
              item = _context9.sent;
              _context9.next = 14;
              break;

            case 10:
              _context9.next = 12;
              return _purity["default"].create({
                _id: false,
                name_ar: validation.name_ar,
                name_en: validation.name_en
              });

            case 12:
              newGroupUnit = _context9.sent;
              res.status(200).send(newGroupUnit);

            case 14:
              _context9.next = 19;
              break;

            case 16:
              _context9.prev = 16;
              _context9.t0 = _context9["catch"](0);
              next(_context9.t0);

            case 19:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 16]]);
    }))();
  },
  getPurity: function getPurity(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var user, itemGroups;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              user = req.user;
              _context10.next = 4;
              return _purity["default"].find({
                deleted: false
              });

            case 4:
              itemGroups = _context10.sent;
              res.status(200).send(itemGroups);
              _context10.next = 11;
              break;

            case 8:
              _context10.prev = 8;
              _context10.t0 = _context10["catch"](0);
              next(_context10.t0);

            case 11:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 8]]);
    }))();
  },
  validateDelPurity: function validateDelPurity() {
    var validations = [(0, _check.body)('id').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  delPurity: function delPurity(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;

              if (!req.query.id) {
                _context11.next = 6;
                break;
              }

              _context11.next = 4;
              return _purity["default"].updateOne({
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
              _context11.next = 7;
              break;

            case 6:
              next("delete items group error");

            case 7:
              _context11.next = 12;
              break;

            case 9:
              _context11.prev = 9;
              _context11.t0 = _context11["catch"](0);
              next(_context11.t0);

            case 12:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 9]]);
    }))();
  },
  validateUnits: function validateUnits() {
    var validations = [(0, _check.body)('id').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_ar').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_en').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  units: function units(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var validation, item, newGroupUnit;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              validation = (0, _CheckMethods.checkValidations)(req);
              console.log(validation);
              console.log(req.body);

              if (!validation.id) {
                _context12.next = 10;
                break;
              }

              _context12.next = 7;
              return _units["default"].updateOne({
                _id: validation.id
              }, {
                $set: {
                  name_ar: validation.name_ar,
                  name_en: validation.name_en
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
              item = _context12.sent;
              _context12.next = 14;
              break;

            case 10:
              _context12.next = 12;
              return _units["default"].create({
                _id: false,
                name_ar: validation.name_ar,
                name_en: validation.name_en
              });

            case 12:
              newGroupUnit = _context12.sent;
              res.status(200).send(newGroupUnit);

            case 14:
              _context12.next = 19;
              break;

            case 16:
              _context12.prev = 16;
              _context12.t0 = _context12["catch"](0);
              next(_context12.t0);

            case 19:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[0, 16]]);
    }))();
  },
  getUnits: function getUnits(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var user, itemGroups;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              user = req.user;
              _context13.next = 4;
              return _units["default"].find({
                deleted: false
              });

            case 4:
              itemGroups = _context13.sent;
              res.status(200).send(itemGroups);
              _context13.next = 11;
              break;

            case 8:
              _context13.prev = 8;
              _context13.t0 = _context13["catch"](0);
              next(_context13.t0);

            case 11:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[0, 8]]);
    }))();
  },
  validateDelUnits: function validateDelUnits() {
    var validations = [(0, _check.body)('id').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  delUnits: function delUnits(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;

              if (!req.query.id) {
                _context14.next = 6;
                break;
              }

              _context14.next = 4;
              return _units["default"].updateOne({
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
              _context14.next = 7;
              break;

            case 6:
              next("delete items group error");

            case 7:
              _context14.next = 12;
              break;

            case 9:
              _context14.prev = 9;
              _context14.t0 = _context14["catch"](0);
              next(_context14.t0);

            case 12:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, null, [[0, 9]]);
    }))();
  },

  /******/
  validateOrderStatus: function validateOrderStatus() {
    var validations = [(0, _check.body)('id').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_ar').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_en').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  orderStatus: function orderStatus(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var validation, item, newGroupUnit;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              validation = (0, _CheckMethods.checkValidations)(req);
              console.log(validation);
              console.log(req.body);

              if (!validation.id) {
                _context15.next = 10;
                break;
              }

              _context15.next = 7;
              return _order_status["default"].updateOne({
                _id: validation.id
              }, {
                $set: {
                  name_ar: validation.name_ar,
                  name_en: validation.name_en
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
              item = _context15.sent;
              _context15.next = 14;
              break;

            case 10:
              _context15.next = 12;
              return _order_status["default"].create({
                _id: false,
                name_ar: validation.name_ar,
                name_en: validation.name_en
              });

            case 12:
              newGroupUnit = _context15.sent;
              res.status(200).send(newGroupUnit);

            case 14:
              _context15.next = 19;
              break;

            case 16:
              _context15.prev = 16;
              _context15.t0 = _context15["catch"](0);
              next(_context15.t0);

            case 19:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[0, 16]]);
    }))();
  },
  getOrderStatus: function getOrderStatus(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var user, itemGroups;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              user = req.user;
              _context16.next = 4;
              return _order_status["default"].find({
                deleted: false
              });

            case 4:
              itemGroups = _context16.sent;
              res.status(200).send(itemGroups);
              _context16.next = 11;
              break;

            case 8:
              _context16.prev = 8;
              _context16.t0 = _context16["catch"](0);
              next(_context16.t0);

            case 11:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, null, [[0, 8]]);
    }))();
  },
  delOrderStatus: function delOrderStatus(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;

              if (!req.query.id) {
                _context17.next = 6;
                break;
              }

              _context17.next = 4;
              return _order_status["default"].updateOne({
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
              _context17.next = 7;
              break;

            case 6:
              next("delete items group error");

            case 7:
              _context17.next = 12;
              break;

            case 9:
              _context17.prev = 9;
              _context17.t0 = _context17["catch"](0);
              next(_context17.t0);

            case 12:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, null, [[0, 9]]);
    }))();
  },

  /***/
  validatePM: function validatePM() {
    var validations = [(0, _check.body)('id').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_ar').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_en').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  pm: function pm(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      var validation, item, newGroupUnit;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.prev = 0;
              validation = (0, _CheckMethods.checkValidations)(req);
              console.log(validation);
              console.log(req.body);

              if (!validation.id) {
                _context18.next = 10;
                break;
              }

              _context18.next = 7;
              return _payment_method["default"].updateOne({
                _id: validation.id
              }, {
                $set: {
                  name_ar: validation.name_ar,
                  name_en: validation.name_en
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
              item = _context18.sent;
              _context18.next = 14;
              break;

            case 10:
              _context18.next = 12;
              return _payment_method["default"].create({
                _id: false,
                name_ar: validation.name_ar,
                name_en: validation.name_en
              });

            case 12:
              newGroupUnit = _context18.sent;
              res.status(200).send(newGroupUnit);

            case 14:
              _context18.next = 19;
              break;

            case 16:
              _context18.prev = 16;
              _context18.t0 = _context18["catch"](0);
              next(_context18.t0);

            case 19:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, null, [[0, 16]]);
    }))();
  },
  getPM: function getPM(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      var user, itemGroups;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.prev = 0;
              user = req.user;
              _context19.next = 4;
              return _payment_method["default"].find({
                deleted: false
              });

            case 4:
              itemGroups = _context19.sent;
              res.status(200).send(itemGroups);
              _context19.next = 11;
              break;

            case 8:
              _context19.prev = 8;
              _context19.t0 = _context19["catch"](0);
              next(_context19.t0);

            case 11:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, null, [[0, 8]]);
    }))();
  },
  delPM: function delPM(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.prev = 0;

              if (!req.query.id) {
                _context20.next = 6;
                break;
              }

              _context20.next = 4;
              return _payment_method["default"].updateOne({
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
              _context20.next = 7;
              break;

            case 6:
              next("delete items group error");

            case 7:
              _context20.next = 12;
              break;

            case 9:
              _context20.prev = 9;
              _context20.t0 = _context20["catch"](0);
              next(_context20.t0);

            case 12:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, null, [[0, 9]]);
    }))();
  }
};
exports["default"] = _default;