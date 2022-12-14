"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _settings = _interopRequireDefault(require("./settings.route/settings.route"));

var _user = _interopRequireDefault(require("./user.route/user.route"));

var _market = _interopRequireDefault(require("./market.route/market.route"));

var _seller = _interopRequireDefault(require("./seller.route/seller.route"));

var _products = _interopRequireDefault(require("./products.route/products.route"));

var _shop = _interopRequireDefault(require("./shop.route/shop.route"));

var _customer = _interopRequireDefault(require("./customer.route/customer.route"));

var _order = _interopRequireDefault(require("./order.route/order.route"));

var router = _express["default"].Router();

router.use('/', _user["default"]);
router.use('/settings', _settings["default"]);
router.use('/market', _market["default"]);
router.use('/seller', _seller["default"]);
router.use('/product', _products["default"]);
router.use('/shop', _shop["default"]);
router.use('/customer', _customer["default"]);
router.use('/order', _order["default"]);
var _default = router;
exports["default"] = _default;