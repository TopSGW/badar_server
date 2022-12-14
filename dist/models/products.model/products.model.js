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

var autoIncrementSQ = require('mongoose-sequence')(_mongoose["default"]); // import bcrypt from 'bcryptjs';
// import isEmail from 'validator/lib/isEmail';


var productSchema = new _mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    "default": 0
  },
  name_ar: {
    type: String
  },
  name_en: {
    type: String
  },
  category_id: {
    type: Number,
    ref: 'items_category'
  },
  purity_id: {
    type: [Number],
    ref: 'purity'
  },
  shop_id: {
    type: Number,
    ref: 'shop'
  },
  weight: {
    type: Number
  },
  quantity: {
    type: Number
  },
  extra_price: {
    type: Number
  },
  group_id: {
    type: Number,
    ref: 'items_group'
  },
  unit_id: {
    type: [Number],
    ref: 'units'
  },
  commission: {
    type: Number
  },
  description_ar: {
    type: String
  },
  description_en: {
    type: String
  },
  images: {
    type: [Number],
    ref: 'upload'
  },
  meta: {
    title: String,
    keywords: [String],
    description: String
  },
  barcode: {
    type: String
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
productSchema.set('toJSON', {
  transform: function transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret.password;
    delete ret._id;
    delete ret.__v;
  }
});
productSchema.plugin(_mongooseI18nLocalize["default"], {
  locales: ['en', 'ar']
});
productSchema.plugin(autoIncrementSQ, {
  id: "product_id",
  inc_field: "_id"
});

var _default = _mongoose["default"].model('product', productSchema);

exports["default"] = _default;