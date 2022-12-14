"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _contactUs = _interopRequireDefault(require("../../models/contactUs.model/contactUs.model"));

var _ApiResponse = _interopRequireDefault(require("../../helpers/ApiResponse"));

var _CheckMethods = require("../../helpers/CheckMethods");

var _check = require("express-validator/check");

var _shared = require("../shared.controller/shared.controller");

var _i18n = _interopRequireDefault(require("i18n"));

var _notif = _interopRequireDefault(require("../notif.controller/notif.controller"));

var _socketEvents = _interopRequireDefault(require("../../socketEvents"));

var _emailMessage = require("../../services/emailMessage.service");

// import config from '../../config'
var populateQuery = [{
  path: 'user',
  model: 'user'
}];
var _default = {};
exports["default"] = _default;