"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _check = require("express-validator/check");

var _ApiError = _interopRequireDefault(require("../../helpers/ApiError"));

var _i18n = _interopRequireDefault(require("i18n"));

var _shop = _interopRequireDefault(require("../../models/shop.model/shop.model"));

var _user = _interopRequireDefault(require("../../models/user.model/user.model"));

var _CheckMethods = require("../../helpers/CheckMethods");

var _default = {
  validateShop: function validateShop() {
    var validations = [(0, _check.body)('id').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('seller_id').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('app_name_ar').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('app_name_en').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('email').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('phone').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('mobile').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('address_en').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('address_ar').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('description_ar').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('description_en').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('city').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('region').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('zip').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('commission').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('images').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  shop: function shop(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var validation, item, newGroupUnit;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              validation = (0, _CheckMethods.checkValidations)(req);
              console.log(validation);
              console.log(req.files);

              if (!validation.id) {
                _context.next = 10;
                break;
              }

              _context.next = 7;
              return _shop["default"].updateOne({
                _id: validation.id
              }, {
                $set: {
                  seller_id: validation.seller_id,
                  app_name_ar: validation.app_name_ar,
                  app_name_en: validation.app_name_en,
                  email: validation.email,
                  phone: validation.phone,
                  mobile: validation.mobile,
                  address_en: validation.address_en,
                  address_ar: validation.address_ar,
                  description_ar: validation.description_ar,
                  description_en: validation.description_en,
                  city: validation.city,
                  region: validation.region,
                  zip: validation.zip,
                  commission: validation.commission,
                  images: validation.images
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
              _context.next = 15;
              break;

            case 10:
              _context.next = 12;
              return _shop["default"].create({
                _id: false,
                seller_id: validation.seller_id,
                app_name_ar: validation.app_name_ar,
                app_name_en: validation.app_name_en,
                email: validation.email,
                phone: validation.phone,
                mobile: validation.mobile,
                address_en: validation.address_en,
                address_ar: validation.address_ar,
                description_ar: validation.description_ar,
                description_en: validation.description_en,
                city: validation.city,
                region: validation.region,
                zip: validation.zip,
                commission: validation.commission,
                images: validation.images
              });

            case 12:
              newGroupUnit = _context.sent;
              console.log(newGroupUnit);
              res.status(200).send(newGroupUnit);

            case 15:
              _context.next = 20;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](0);
              next(_context.t0);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 17]]);
    }))();
  },
  delShop: function delShop(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              if (!req.query.id) {
                _context2.next = 6;
                break;
              }

              _context2.next = 4;
              return _shop["default"].updateOne({
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
              _context2.next = 7;
              break;

            case 6:
              next("delete items group error");

            case 7:
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
  getShops: function getShops(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var user, itemGroups, id;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              user = req.user;
              itemGroups = {};

              if (req.query.id) {
                _context3.next = 9;
                break;
              }

              _context3.next = 6;
              return _shop["default"].find({
                deleted: false
              });

            case 6:
              itemGroups = _context3.sent;
              _context3.next = 13;
              break;

            case 9:
              id = req.query.id;
              _context3.next = 12;
              return _shop["default"].findOne({
                _id: id,
                deleted: false
              });

            case 12:
              itemGroups = _context3.sent;

            case 13:
              res.status(200).send(itemGroups);
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
  }
};
exports["default"] = _default;