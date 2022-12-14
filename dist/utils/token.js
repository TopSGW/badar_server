"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("dotenv/config");

// const { jwtSecret } = config;
var generateToken = function generateToken(id) {
  return _jsonwebtoken["default"].sign({
    sub: id,
    iss: 'App',
    iat: new Date().getTime()
  }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

exports.generateToken = generateToken;