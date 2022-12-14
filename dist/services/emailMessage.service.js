"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = sendEmail;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

require("dotenv/config");

// import config  from '../config'
var os = require('os');

var transporter = _nodemailer["default"].createTransport({
  pool: true,
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {// user: 'octateamsolution@gmail.com',
    // pass: 'oTs20202020'
  },
  tls: {
    rejectUnauthorized: false
  }
});

function sendEmail(targetMail, text) {
  var mailOptions = {
    from: "".concat(process.env.APP_NAME),
    to: targetMail,
    subject: "".concat(process.env.APP_NAME),
    text: text
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
  return true;
}