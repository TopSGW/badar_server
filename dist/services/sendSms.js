"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendsms = void 0;

var _ApiError = _interopRequireDefault(require("../helpers/ApiError"));

var _i18n = _interopRequireDefault(require("i18n"));

require("dotenv/config");

// import reportController from '../controllers/report.controller/report.controller'
var https = require('https'); // import config from '../config';
// import ConfirmationCode from '../models/confirmationsCodes.model/confirmationscodes.model';
// remove this after you've confirmed it working


var user = process.env.SMS_GATEWAY_USER;
var password = process.env.SMS_GATEWAY_PASSWORD;
var sender = process.env.SMS_GATEWAY_SENDER;

var sendsms = function sendsms(number, code, res, next) {
  console.log("TWL", number);

  try {
    var options = {
      hostname: 'rest.gateway.sa',
      port: 443,
      path: '/api/sendsms?' + 'api_id=' + user + '&api_password=' + password + '&textmessage=' + code + '&phonenumber=' + number + '&sms_type=T&encoding=T&sender_id=Gateway.sa',
      method: 'GET'
    };
    console.log(options);
    var req = https.request(options, function (ress) {
      console.log("statusCode: ".concat(res.statusCode));
      ress.on('data', function (d) {
        process.stdout.write(d);
        res.status(200).send("send code successfuly");
        console.log('verification Sent');
      });
    });
    req.on('error', function (error) {
      console.error(error);
      next(new _ApiError["default"](400, 'فشل إرسال الكود'));
    });
    req.end();
  } catch (error) {
    next(new _ApiError["default"](400, 'فشل إرسال الكود'));
    console.log('error in sending sms ==> ', error);
  }
};

exports.sendsms = sendsms;