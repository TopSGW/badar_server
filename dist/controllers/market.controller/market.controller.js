"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../models/user.model/user.model"));

var _marketing_category = _interopRequireDefault(require("../../models/marketing.model/marketing_category.model"));

var _offer = _interopRequireDefault(require("../../models/marketing.model/offer.model"));

var _coupon = _interopRequireDefault(require("../../models/marketing.model/coupon.model"));

var _ApiResponse = _interopRequireDefault(require("../../helpers/ApiResponse"));

var _CheckMethods = require("../../helpers/CheckMethods");

var _check = require("express-validator/check");

var _i18n = _interopRequireDefault(require("i18n"));

// import config from '../../config'
var populateQuery = [{
  path: 'user',
  model: 'user'
}];
var _default = {
  validateOffer: function validateOffer() {
    var validations = [(0, _check.body)('id').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_ar').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_en').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('description_ar').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('description_en').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('start_date').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('end_date').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('discount').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  offer: function offer(req, res, next) {
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
              return _offer["default"].updateOne({
                _id: validation.id
              }, {
                $set: {
                  name_ar: validation.name_ar,
                  name_en: validation.name_en,
                  description_en: validation.description_en,
                  description_ar: validation.description_ar,
                  start_date: validation.start_date,
                  end_date: validation.end_date,
                  discount: validation.discount
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
              return _offer["default"].create({
                _id: false,
                name_ar: validation.name_ar,
                name_en: validation.name_en,
                description_en: validation.description_en,
                description_ar: validation.description_ar,
                start_date: validation.start_date,
                end_date: validation.end_date,
                discount: validation.discount
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
  getOffer: function getOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var user, itemGroups;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              user = req.user;
              _context2.next = 4;
              return _offer["default"].find({
                deleted: false
              });

            case 4:
              itemGroups = _context2.sent;
              res.status(200).send(itemGroups);
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              next(_context2.t0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8]]);
    }))();
  },
  delOffer: function delOffer(req, res, next) {
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
              return _offer["default"].updateOne({
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
  },

  /*****/
  validateCategory: function validateCategory() {
    var validations = [(0, _check.body)('id').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_ar').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_en').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  category: function category(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var validation, item, newGroupUnit;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              validation = (0, _CheckMethods.checkValidations)(req);
              console.log(validation);
              console.log(req.body);

              if (!validation.id) {
                _context4.next = 10;
                break;
              }

              _context4.next = 7;
              return _marketing_category["default"].updateOne({
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
              item = _context4.sent;
              _context4.next = 14;
              break;

            case 10:
              _context4.next = 12;
              return _marketing_category["default"].create({
                _id: false,
                name_ar: validation.name_ar,
                name_en: validation.name_en
              });

            case 12:
              newGroupUnit = _context4.sent;
              res.status(200).send(newGroupUnit);

            case 14:
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
  },
  getCategory: function getCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var user, itemGroups;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              user = req.user;
              _context5.next = 4;
              return _marketing_category["default"].find({
                deleted: false
              });

            case 4:
              itemGroups = _context5.sent;
              res.status(200).send(itemGroups);
              _context5.next = 11;
              break;

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              next(_context5.t0);

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 8]]);
    }))();
  },
  delCategory: function delCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;

              if (!req.query.id) {
                _context6.next = 6;
                break;
              }

              _context6.next = 4;
              return _marketing_category["default"].updateOne({
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
              _context6.next = 7;
              break;

            case 6:
              next("delete items group error");

            case 7:
              _context6.next = 12;
              break;

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              next(_context6.t0);

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 9]]);
    }))();
  },

  /*****/
  validateCoupon: function validateCoupon() {
    var validations = [(0, _check.body)('id').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('code').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('discount').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('start_date').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('end_date').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  coupon: function coupon(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var validation, item, newGroupUnit;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              validation = (0, _CheckMethods.checkValidations)(req);
              console.log(validation);
              console.log(req.body);

              if (!validation.id) {
                _context7.next = 10;
                break;
              }

              _context7.next = 7;
              return _coupon["default"].updateOne({
                _id: validation.id
              }, {
                $set: {
                  code: validation.code,
                  discount: validation.discount,
                  start_date: validation.start_date,
                  end_date: validation.end_date
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
              item = _context7.sent;
              _context7.next = 14;
              break;

            case 10:
              _context7.next = 12;
              return _coupon["default"].create({
                _id: false,
                code: validation.code,
                discount: validation.discount,
                start_date: validation.start_date,
                end_date: validation.end_date
              });

            case 12:
              newGroupUnit = _context7.sent;
              res.status(200).send(newGroupUnit);

            case 14:
              _context7.next = 19;
              break;

            case 16:
              _context7.prev = 16;
              _context7.t0 = _context7["catch"](0);
              next(_context7.t0);

            case 19:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 16]]);
    }))();
  },
  getCoupon: function getCoupon(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var user, itemGroups;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              user = req.user;
              _context8.next = 4;
              return _coupon["default"].find({
                deleted: false
              });

            case 4:
              itemGroups = _context8.sent;
              res.status(200).send(itemGroups);
              _context8.next = 11;
              break;

            case 8:
              _context8.prev = 8;
              _context8.t0 = _context8["catch"](0);
              next(_context8.t0);

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 8]]);
    }))();
  },
  delCoupon: function delCoupon(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;

              if (!req.query.id) {
                _context9.next = 6;
                break;
              }

              _context9.next = 4;
              return _coupon["default"].updateOne({
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
              _context9.next = 7;
              break;

            case 6:
              next("delete items group error");

            case 7:
              _context9.next = 12;
              break;

            case 9:
              _context9.prev = 9;
              _context9.t0 = _context9["catch"](0);
              next(_context9.t0);

            case 12:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 9]]);
    }))();
  }
  /******************************/

  /******************************/

  /******************************/

};
exports["default"] = _default;