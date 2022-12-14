"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _url = _interopRequireDefault(require("url"));

var ApiResponse = /*#__PURE__*/function () {
  function ApiResponse(data, page, pageCount, limit, totalCount, req, maxPrice, minPrice) {
    (0, _classCallCheck2["default"])(this, ApiResponse);
    this.data = data;
    this.page = page;
    this.pageCount = pageCount;
    this.limit = limit;
    this.totalCount = totalCount;
    this.links = {};

    if (maxPrice) {
      this.maxPrice = maxPrice;
    }

    if (minPrice) {
      this.minPrice = minPrice;
    }

    var appUrl = req.protocol + '://' + req.get('host') + _url["default"].parse(req.originalUrl).pathname;

    this.addSelfLink(appUrl);
    if (page >= 1 && page < pageCount) this.addNextLink(appUrl);
    if (page > 1 && page <= pageCount) this.addPrevLink(appUrl);
  }

  (0, _createClass2["default"])(ApiResponse, [{
    key: "addSelfLink",
    value: function addSelfLink(appUrl) {
      this.links.self = appUrl + "?page=" + this.page + "&limit=" + this.limit; // self page
    }
  }, {
    key: "addNextLink",
    value: function addNextLink(appUrl) {
      var afterPage = this.page + 1;
      this.links.next = appUrl + "?page=" + afterPage + "&limit=" + this.limit; // next page

      this.links.last = appUrl + "?page=" + this.pageCount + "&limit=" + this.limit; // last page
    }
  }, {
    key: "addPrevLink",
    value: function addPrevLink(appUrl) {
      var prevPage = this.page - 1;
      this.links.prev = appUrl + "?page=" + prevPage + "&limit=" + this.limit; // prev page

      this.links.first = appUrl + "?page=1" + "&limit=" + this.limit; // first page
    }
  }]);
  return ApiResponse;
}();

var _default = ApiResponse;
exports["default"] = _default;