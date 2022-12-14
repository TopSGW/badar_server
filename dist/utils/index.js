"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  toImgUrl: true,
  parseStringToArrayOfObjectsMw: true,
  toFileUrl: true
};
exports.parseStringToArrayOfObjectsMw = parseStringToArrayOfObjectsMw;
exports.toFileUrl = toFileUrl;
exports.toImgUrl = toImgUrl;

var _ApiError = _interopRequireDefault(require("../helpers/ApiError"));

var _token = require("./token");

Object.keys(_token).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _token[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _token[key];
    }
  });
});

// Convert Local Upload To Cloudinary Url  toImgUrlCloudinary
function toImgUrl(req, multerObject) {
  try {
    multerObject.path = '/' + multerObject.path;
    return multerObject.path;
  } catch (err) {
    throw new _ApiError["default"](500, 'can not upload img with error -> ' + err.message);
  }
}

function parseStringToArrayOfObjectsMw(fieldName) {
  var inWhich = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';
  return function (req, res, next) {
    try {
      if (req[inWhich][fieldName]) {
        var arrOfObjectsAsString = req[inWhich][fieldName];
        var handledStringForParsing = arrOfObjectsAsString.replace(/([a-zA-Z0-9]+?):/g, '"$1":').replace(/'/g, '"');
        req[inWhich][fieldName] = JSON.parse(handledStringForParsing);
      }

      next();
    } catch (err) {
      //console.log(err);
      next(new _ApiError["default"](400, {
        message: "Failed To Parse \"".concat(fieldName, "\"")
      }));
    }
  };
}
/*
// Convert Local Upload To Full Url toImgUrl
export async function toImgUrlCloudinary(multerObject) {
  return `${config.appUrl}/${multerObject.destination}/${multerObject.filename}`;
}

*/


function toFileUrl(req, multerObject) {
  try {
    //multerObject.path = req.protocol+'://'+req.get('host')+'/'+multerObject.path;
    multerObject.path = '/' + multerObject.path;
    return multerObject.path;
  } catch (err) {
    throw new _ApiError["default"](500, 'Failed To Upload An Image due to network issue! Retry again...');
  }
}