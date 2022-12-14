"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _products = _interopRequireDefault(require("../../controllers/products.controller/products.controller"));

var _auth = _interopRequireDefault(require("../../middlewares/auth"));

// import { requireAuth } from '../../services/passport';
// import { multerSaveTo } from '../../services/multer-service';
// import { parseObject } from '../../controllers/shared.controller/shared.controller';
var router = _express["default"].Router();

router.route('/').get(_auth["default"], _products["default"].getProduct).post(_auth["default"], _products["default"].validateProduct(), _products["default"].product)["delete"](_auth["default"], _products["default"].delProduct);
router.route('/filter').post(_auth["default"], _products["default"].filtredProducts);
router.route('/generateBarcode').get(_auth["default"], _products["default"].generateBarcodeProducts);
router.route('/getBarcode').get(_auth["default"], _products["default"].getBarcodeProducts);
router.route('/scanBarcode').get(_auth["default"], _products["default"].scanBarcodeProducts);
var _default = router;
exports["default"] = _default;