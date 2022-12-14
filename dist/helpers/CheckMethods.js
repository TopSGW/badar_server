"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkExistThenGet = exports.checkExist = void 0;
exports.checkLanguage = checkLanguage;
exports.checkValidations = checkValidations;
exports.createPromise = void 0;
exports.deleteImages = deleteImages;
exports.fieldhandleImg = fieldhandleImg;
exports.handleFiles = handleFiles;
exports.handleImg = handleImg;
exports.handleImgs = handleImgs;
exports.localeFn = exports.isYear = exports.isNumeric = exports.isLng = exports.isLat = exports.isInternationNo = exports.isImgUrl = exports.isArray = void 0;
exports.parseObject = parseObject;
exports.removeFile = removeFile;
exports.validIds = exports.validId = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ApiError = _interopRequireDefault(require("./ApiError"));

var _i18n = _interopRequireDefault(require("i18n"));

var _check = require("express-validator/check");

var _filter = require("express-validator/filter");

var _mongoose = require("mongoose");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// const capitalizeFirstChar = (name) => name.charAt(0).toUpperCase() + name.slice(1);
var checkExist = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, Model) {
    var extraQuery,
        errorMessage,
        model,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            extraQuery = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            errorMessage = _args.length > 3 && _args[3] !== undefined ? _args[3] : '';

            if ((0, _typeof2["default"])(extraQuery) != 'object') {
              errorMessage = extraQuery;
              extraQuery = {};
            }

            if (!validId(id)) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return Model.findOne(_objectSpread({
              _id: id
            }, extraQuery)).lean();

          case 6:
            model = _context.sent;

            if (!model) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return");

          case 9:
            throw new _ApiError["default"](404, errorMessage || "".concat(Model.modelName, " Not Found"));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkExist(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkExist = checkExist;

function checkLanguage(arModel, enModel, req) {
  var language = _i18n["default"].getLocale(req);

  try {
    if (language == 'ar') {
      return arModel;
    } else {
      return enModel;
    }
  } catch (error) {
    throw new _ApiError["default"](400, 'Can Not Set Language.');
  }
}

var checkExistThenGet = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, Model) {
    var findQuery,
        errorMessage,
        populateQuery,
        selectQuery,
        model,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            findQuery = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {
              populate: '',
              select: ''
            };
            errorMessage = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : '';
            populateQuery = findQuery.populate || '', selectQuery = findQuery.select || '';

            if ((0, _typeof2["default"])(findQuery) != 'object') {
              errorMessage = findQuery;
              findQuery = {};
            } else {
              delete findQuery.populate;
              delete findQuery.select;
            }

            if (!validId(id)) {
              _context2.next = 10;
              break;
            }

            _context2.next = 7;
            return Model.findOne(_objectSpread({
              _id: id
            }, findQuery)).populate(populateQuery).select(selectQuery);

          case 7:
            model = _context2.sent;

            if (!model) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", model);

          case 10:
            throw new _ApiError["default"](404, errorMessage || "".concat(Model.modelName, " Not Found"));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function checkExistThenGet(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // export async function checkExistThenUpdate(id, Model, updateQuery, updateOptions = { populate: '', select: '' }, errorMessage = '') {
//     let populateQuery = updateQuery.populate, selectQuery = updateQuery.select;
//     delete updateQuery.populate;
//     delete updateQuery.select;
//     if (validId(id)) {
//         let model = await Model.findByIdAndUpdate(id, updateQuery, { new: true })
//             .populate(populateQuery).select(selectQuery);
//         if (model)
//             return model;
//     }
//     throw new ApiError(404, errorMessage || `${Model.modelName} Not Found`);
// }


exports.checkExistThenGet = checkExistThenGet;

function deleteTempImages(req) {// if (req.files) {
  //     console.log("req.files.length======", req.files.length)
  //     if (req.files.length && req.files.length > 0) {
  //         req.files.forEach(element => {
  //             fs.unlink(element.path, (err) => {
  //                 if (err) throw err;
  //                 console.log('file deleted');
  //             });
  //         });
  //     } else {
  //         let files = req.files;
  //         //console.log(files)
  //         for (var element in files) {
  //             files['' + element].forEach(file => {
  //                 fs.unlink(file.path, (err) => {
  //                     if (err) throw err;
  //                     console.log('file deleted');
  //                 });
  //             });
  //         };
  //     }
  // }
  // if (req.file) {
  //     fs.unlink(req.file.path, (err) => {
  //         if (err) throw err;
  //         console.log('file deleted');
  //     });
  // }
}

function deleteImages(images) {
  if (images.length && images.length > 0) {
    images.forEach(function (element) {
      if (fs.existsSync('.' + element)) fs.unlink('.' + element, function (err) {
        if (err) throw err;
      });
    });
  }
}

var createPromise = function createPromise(query) {
  var newPromise = new Promise( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve, reject) {
      var result;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return query;

            case 3:
              result = _context3.sent;
              resolve(result);
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              reject(_context3.t0);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
  return newPromise;
};

exports.createPromise = createPromise;

var localeFn = function localeFn(localeName) {
  return function (value, _ref4) {
    var req = _ref4.req;
    return req.__(localeName);
  };
};

exports.localeFn = localeFn;

function checkValidations(req) {
  var validationErrors = (0, _check.validationResult)(req).array({
    onlyFirstError: true
  });

  if (validationErrors.length > 0) {
    deleteTempImages(req);
    console.log(validationErrors);
    throw new _ApiError["default"](422, validationErrors);
  }

  return (0, _filter.matchedData)(req);
}

function handleImgs(req) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$attributeName = _ref5.attributeName,
      attributeName = _ref5$attributeName === void 0 ? 'images' : _ref5$attributeName,
      _ref5$isUpdate = _ref5.isUpdate,
      isUpdate = _ref5$isUpdate === void 0 ? false : _ref5$isUpdate;

  var errMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (req.files && req.files.length > 0 || isUpdate && req.body[attributeName]) {
    // .files contain an array of 'images'
    var images = [];

    if (isUpdate && req.body[attributeName]) {
      if (Array.isArray(req.body[attributeName])) images = req.body[attributeName];else images.push(req.body[attributeName]);
    }

    var _iterator = _createForOfIteratorHelper(req.files),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var img = _step.value;
        images.push(toImgUrl(req, img));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return images;
  }

  throw new _ApiError["default"].UnprocessableEntity("".concat(attributeName, " are required")) || errMessage;
}

function handleImg(req) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref6$attributeName = _ref6.attributeName,
      attributeName = _ref6$attributeName === void 0 ? 'img' : _ref6$attributeName,
      _ref6$isUpdate = _ref6.isUpdate,
      isUpdate = _ref6$isUpdate === void 0 ? false : _ref6$isUpdate;

  if (req.file || isUpdate && req.body[attributeName]) return req.body[attributeName] || toImgUrl(req, req.file);
  throw new _ApiError["default"].UnprocessableEntity("".concat(attributeName, " is required"));
}

function handleFiles(req) {
  var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref7$attributeName = _ref7.attributeName,
      attributeName = _ref7$attributeName === void 0 ? 'files' : _ref7$attributeName,
      _ref7$isUpdate = _ref7.isUpdate,
      isUpdate = _ref7$isUpdate === void 0 ? false : _ref7$isUpdate;

  if (req.files && req.files.length > 0 || isUpdate && req.body[attributeName]) {
    var files = [];

    if (isUpdate && req.body[attributeName]) {
      if (Array.isArray(req.body[attributeName])) files = req.body[attributeName];else files.push(req.body[attributeName]);
    }

    var _iterator2 = _createForOfIteratorHelper(req.files),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var file = _step2.value;
        files.push(toFileUrl(req, file));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return files;
  }

  throw new _ApiError["default"].UnprocessableEntity("".concat(attributeName, " are required"));
}

function parseObject(arrayOfFields) {
  var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var fieldName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'body';
  return function (req, res, next) {
    try {
      for (var index = 0; index < arrayOfFields.length; index++) {
        var name = arrayOfFields[index];

        if (req[fieldName][name]) {
          req[fieldName][name] = JSON.parse(req[fieldName][name]);
        }
      }

      return next();
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };
}

function fieldhandleImg(req) {
  var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref8$attributeName = _ref8.attributeName,
      attributeName = _ref8$attributeName === void 0 ? 'images' : _ref8$attributeName,
      _ref8$isUpdate = _ref8.isUpdate,
      isUpdate = _ref8$isUpdate === void 0 ? false : _ref8$isUpdate;

  if (req.files && req.files[attributeName].length > 0 || isUpdate && req.body[attributeName]) {
    // .files contain an array of 'images'
    var images = [];

    for (var index = 0; index < req.files[attributeName].length; index++) {
      var image = toImgUrl(req, req.files[attributeName][index]);
      images.push(image);
    }

    return images;
  }

  throw new _ApiError["default"].UnprocessableEntity("".concat(attributeName, " are required"));
}

function removeFile() {
  var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var files = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (files.length > 0) {
    files.forEach(function (element) {
      fs.unlink(element, function (err) {
        if (err) throw err;
      });
    });
  } else {
    fs.unlink(file, function (err) {
      if (err) throw err;
    });
  }
}

var validId = function validId(id) {
  return isNumeric(id);
};

exports.validId = validId;

var validIds = function validIds(ids) {
  return isArray(ids) && ids.every(function (id) {
    return validId(id);
  });
};

exports.validIds = validIds;

var isNumeric = function isNumeric(value) {
  return Number.isInteger(parseInt(value));
};

exports.isNumeric = isNumeric;

var isArray = function isArray(values) {
  return Array.isArray(values);
};

exports.isArray = isArray;

var isImgUrl = function isImgUrl(value) {
  return /\.(jpeg|jpg|png|PNG|JPG|JPEG)$/.test(value);
};

exports.isImgUrl = isImgUrl;

var isLat = function isLat(value) {
  return /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/.test(value);
};

exports.isLat = isLat;

var isLng = function isLng(value) {
  return /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/.test(value);
};

exports.isLng = isLng;

var isYear = function isYear(value) {
  return /^\d{4}$/.test(value);
};

exports.isYear = isYear;

var isInternationNo = function isInternationNo(value) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value);
};

exports.isInternationNo = isInternationNo;