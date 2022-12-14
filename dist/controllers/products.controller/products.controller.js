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

var _user = _interopRequireDefault(require("../../models/user.model/user.model"));

var _ApiError = _interopRequireDefault(require("../../helpers/ApiError"));

var _i18n = _interopRequireDefault(require("i18n"));

var _products = _interopRequireDefault(require("../../models/products.model/products.model"));

var _CheckMethods = require("../../helpers/CheckMethods");

var _default = {
  validateProduct: function validateProduct() {
    var validations = [(0, _check.body)('id').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('seller_id').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_ar').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_en').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('category_id').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('purity_id').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('shop_id').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('weight').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('quantity').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('description_ar').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('description_en').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('group_id').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('unit_id').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('commission').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('extra_price').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('images').optional().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  product: function product(req, res, next) {
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
              return _products["default"].updateOne({
                _id: validation.id
              }, {
                $set: {
                  seller_id: validation.seller_id,
                  name_ar: validation.name_ar,
                  name_en: validation.name_en,
                  category_id: validation.category_id,
                  purity_id: validation.purity_id,
                  shop_id: validation.shop_id,
                  extra_price: validation.extra_price,
                  weight: validation.weight,
                  quantity: validation.quantity,
                  description_ar: validation.description_ar,
                  description_en: validation.description_en,
                  group_id: validation.group_id,
                  unit_id: validation.unit_id,
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
              return _products["default"].create({
                _id: false,
                seller_id: validation.seller_id,
                name_ar: validation.name_ar,
                name_en: validation.name_en,
                category_id: validation.category_id,
                extra_price: validation.extra_price,
                purity_id: validation.purity_id,
                shop_id: validation.shop_id,
                weight: validation.weight,
                quantity: validation.quantity,
                description_ar: validation.description_ar,
                description_en: validation.description_en,
                group_id: validation.group_id,
                unit_id: validation.unit_id,
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
  delProduct: function delProduct(req, res, next) {
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
              return _products["default"].updateOne({
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
  getProduct: function getProduct(req, res, next) {
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
              return _products["default"].find({
                deleted: false
              }).populate('unit_id').populate('unit_id').populate('images').populate('group_id').populate('shop_id').populate('purity_id').populate('category_id');

            case 6:
              itemGroups = _context3.sent;
              _context3.next = 13;
              break;

            case 9:
              id = req.query.id;
              _context3.next = 12;
              return _products["default"].findOne({
                _id: id,
                deleted: false
              }).populate('unit_id').populate('unit_id').populate('images').populate('group_id').populate('shop_id').populate('purity_id').populate('category_id');

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
  },
  filtredProducts: function filtredProducts(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var user, itemGroups;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              user = req.user;
              console.log("req");
              console.log(req.body);
              _context4.next = 6;
              return _products["default"].find({
                deleted: false
              }).where('group_id')["in"](req.body.groups).where('category_id')["in"](req.body.categories).where('shop_id')["in"](req.body.shops).populate('unit_id').populate('unit_id').populate('images').populate('group_id').populate('shop_id').populate('purity_id').populate('category_id');

            case 6:
              itemGroups = _context4.sent;
              res.status(200).send(itemGroups);
              _context4.next = 13;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              next(_context4.t0);

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 10]]);
    }))();
  },
  generateBarcodeProducts: function generateBarcodeProducts(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var user, id, barcode, doc;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              user = req.user;
              id = req.query.id;
              console.log("req");
              console.log(req.body);
              barcode = id + "" + Math.floor(Date.now() / 1000);
              _context5.next = 8;
              return _products["default"].findOneAndUpdate({
                _id: id,
                deleted: false
              }, {
                barcode: barcode
              }, {
                "new": true
              });

            case 8:
              doc = _context5.sent;
              res.status(200).send(doc.barcode);
              _context5.next = 15;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](0);
              next(_context5.t0);

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 12]]);
    }))();
  },
  getBarcodeProducts: function getBarcodeProducts(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var user, barcode, JsBarcode, _require, createCanvas, canvas;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              try {
                user = req.user;
                barcode = req.query.barcode;
                JsBarcode = require('jsbarcode');
                _require = require("canvas"), createCanvas = _require.createCanvas;
                canvas = createCanvas();
                JsBarcode(canvas, barcode); //ending the response by sending the image buffer to the browser

                res.status(200).send(JSON.stringify(canvas.toDataURL("image/png"))); //ending the response by sending the image buffer to the browser
              } catch (error) {
                next(error);
              }

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  scanBarcodeProducts: function scanBarcodeProducts(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var barcode, itemGroups;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              barcode = req.query.barcode;
              _context7.next = 4;
              return _products["default"].findOne({
                barcode: barcode,
                deleted: false
              }).populate('unit_id').populate('unit_id').populate('images').populate('group_id').populate('shop_id').populate('purity_id').populate('category_id');

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
  }
};
exports["default"] = _default;