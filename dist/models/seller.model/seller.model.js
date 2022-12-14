"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseI18nLocalize = _interopRequireDefault(require("mongoose-i18n-localize"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var autoIncrementSQ = require('mongoose-sequence')(_mongoose["default"]);

var sellerSchema = new _mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  // user_id: { // assigned to
  //   type: Number,
  //   required: true
  // },
  name_ar: {
    type: String
  },
  name_en: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  city: {
    type: String
  },
  region: {
    type: String
  },
  zip: {
    type: String
  },
  address_ar: {
    type: String
  },
  address_en: {
    type: String
  },
  description_ar: {
    type: String
  },
  description_en: {
    type: String
  },
  documents: {
    type: [Number],
    ref: 'upload'
  },
  deleted: {
    type: Boolean,
    "default": false
  },
  active: {
    type: Boolean,
    "default": true
  }
}, {
  timestamps: true
});
sellerSchema.set('toJSON', {
  transform: function transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});
sellerSchema.plugin(autoIncrementSQ, {
  id: "seller_id",
  inc_field: "_id"
});
sellerSchema.plugin(_mongooseI18nLocalize["default"], {
  locales: ['ar', 'en']
});

var _default = _mongoose["default"].model('seller', sellerSchema);

exports["default"] = _default;