"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _customer = _interopRequireDefault(require("../../controllers/customer.controller/customer.controller"));

var _auth = _interopRequireDefault(require("../../middlewares/auth"));

// import { requireAuth } from '../../services/passport';
// import { multerSaveTo } from '../../services/multer-service';
// import { parseObject } from '../../controllers/shared.controller/shared.controller';
var router = _express["default"].Router();

router.route('/').get(_auth["default"], _customer["default"].getCustomers).post(_auth["default"], _customer["default"].validate(), _customer["default"].create)["delete"](_auth["default"], _customer["default"]["delete"]);
var _default = router;
exports["default"] = _default;