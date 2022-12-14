"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _market = _interopRequireDefault(require("../../controllers/market.controller/market.controller"));

var _auth = _interopRequireDefault(require("../../middlewares/auth"));

// import { requireAuth } from '../../services/passport';
// import { multerSaveTo } from '../../services/multer-service';
// import { parseObject } from '../../controllers/shared.controller/shared.controller';
var router = _express["default"].Router();

router.route('/category').get(_auth["default"], _market["default"].getCategory).post(_auth["default"], _market["default"].validateCategory(), _market["default"].category)["delete"](_auth["default"], _market["default"].delCategory);
router.route('/offer').get(_auth["default"], _market["default"].getOffer).post(_auth["default"], _market["default"].validateOffer(), _market["default"].offer)["delete"](_auth["default"], _market["default"].delOffer);
router.route('/coupon').get(_auth["default"], _market["default"].getCoupon).post(_auth["default"], _market["default"].validateCoupon(), _market["default"].coupon)["delete"](_auth["default"], _market["default"].delCoupon);
var _default = router;
exports["default"] = _default;