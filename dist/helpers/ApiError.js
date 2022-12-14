"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ApiError = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(ApiError, _Error);

  var _super = _createSuper(ApiError);

  function ApiError(status, message) {
    var _this;

    (0, _classCallCheck2["default"])(this, ApiError);
    _this = _super.call(this);
    _this.status = status;
    _this.message = message;
    return _this;
  }

  (0, _createClass2["default"])(ApiError, null, [{
    key: "NotFound",
    value: function NotFound(name) {
      this.status = 404;
      this.message = "".concat(name, " Not Found");
    }
  }, {
    key: "BadRequest",
    value: function BadRequest() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Bad Request, Check your inputs';
      this.status = 400;
      this.message = message;
    }
  }, {
    key: "UnprocessableEntity",
    value: function UnprocessableEntity(message) {
      this.status = 422;
      this.message = message;
    }
  }, {
    key: "Forbidden",
    value: function Forbidden(message) {
      this.status = 403;
      this.message = message;
    }
  }]);
  return ApiError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

var _default = ApiError;
exports["default"] = _default;