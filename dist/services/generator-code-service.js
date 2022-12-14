"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateVerifyCode = void 0;

var _passwordGenerator = _interopRequireDefault(require("password-generator"));

var generateVerifyCode = function generateVerifyCode(regex) {
  if (regex) {
    return (0, _passwordGenerator["default"])(6, false, regex);
  } else {
    return (0, _passwordGenerator["default"])(6, false);
  }
};

exports.generateVerifyCode = generateVerifyCode;