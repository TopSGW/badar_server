"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _settings = _interopRequireDefault(require("../../controllers/settings.controller/settings.controller"));

var _auth = _interopRequireDefault(require("../../middlewares/auth"));

// import { requireAuth } from '../../services/passport';
// import { multerSaveTo } from '../../services/multer-service';
// import { parseObject } from '../../controllers/shared.controller/shared.controller';
var router = _express["default"].Router();

router.route('/sys_info').get(_auth["default"], _settings["default"].getSystemInfo).post(_auth["default"], _settings["default"].validateSystemInfo(), _settings["default"].updateSystemInfo);
router.route('/items_group').get(_auth["default"], _settings["default"].getItemGroup).post(_auth["default"], _settings["default"].validateItemGroup(), _settings["default"].itemGroup)["delete"](_auth["default"], _settings["default"].delItemGroup);
router.route('/items_category').get(_auth["default"], _settings["default"].getItemCategory).post(_auth["default"], _settings["default"].validateItemCategory(), _settings["default"].itemCategory)["delete"](_auth["default"], _settings["default"].delItemCategory);
router.route('/units').get(_auth["default"], _settings["default"].getUnits).post(_auth["default"], _settings["default"].validateUnits(), _settings["default"].units)["delete"](_auth["default"], _settings["default"].delUnits);
router.route('/purity').get(_auth["default"], _settings["default"].getPurity).post(_auth["default"], _settings["default"].validatePurity(), _settings["default"].purity)["delete"](_auth["default"], _settings["default"].delPurity);
router.route('/pm').get(_auth["default"], _settings["default"].getPM).post(_auth["default"], _settings["default"].validatePM(), _settings["default"].pm)["delete"](_auth["default"], _settings["default"].delPM);
router.route('/order_status').get(_auth["default"], _settings["default"].getOrderStatus).post(_auth["default"], _settings["default"].validateOrderStatus(), _settings["default"].orderStatus)["delete"](_auth["default"], _settings["default"].delOrderStatus);
var _default = router;
exports["default"] = _default;