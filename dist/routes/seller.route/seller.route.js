"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _seller = _interopRequireDefault(require("../../controllers/seller.controller/seller.controller"));

var _auth = _interopRequireDefault(require("../../middlewares/auth"));

// import { requireAuth } from '../../services/passport';
// import { multerSaveTo } from '../../services/multer-service';
// import { parseObject } from '../../controllers/shared.controller/shared.controller';
var router = _express["default"].Router();

router.route('/').get(_auth["default"], _seller["default"].getSeller).post(_auth["default"], _seller["default"].validateSeller(), _seller["default"].seller)["delete"](_auth["default"], _seller["default"].delSeller);
var _default = router;
exports["default"] = _default;