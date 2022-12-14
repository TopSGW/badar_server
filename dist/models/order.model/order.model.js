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

var productSchema = new _mongoose.Schema({
  product: {
    type: Number,
    required: true,
    ref: 'product'
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  offer: {
    type: Number,
    "default": 0
  },
  priceAfterOffer: {
    type: Number
  },
  // color:{type: Number},
  // size:{type: Number},
  taxes: {
    type: Number
  },
  taxesValue: {
    type: Number
  }
});
var orderSchema = new _mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
    "default": 0
  },
  deleted: {
    type: Boolean,
    "default": false
  },
  customer_id: {
    type: Number,
    ref: 'customer',
    required: true
  },
  products: {
    type: [productSchema]
  },
  status: {
    type: String,
    "enum": ['WAITING', 'ACCEPTED', 'REJECTED', 'CANCELED', 'SHIPPED', 'PREPARED', 'HAND_OVERED', 'DELIVERED'],
    "default": 'WAITING'
  },
  rejectReason: {
    type: String
  },
  paymentMethod: {
    type: String,
    "enum": ['CASH', 'CREDIT']
  },
  // creditCard: {
  //     type: Number,
  //     ref: 'credit'
  // },
  /////////////////////////////////////////
  offer_id: {
    type: Number,
    ref: 'offer'
  },
  coupon_id: {
    type: Number,
    ref: 'coupon'
  },
  price: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  discountValue: {
    type: Number,
    "default": 0
  },
  ///////////////////////////////////////////////////////
  checkoutId: {
    type: String
  },
  paymentId: {
    type: String
  },
  paymentStatus: {
    type: String,
    "enum": ['PENDING', 'FAILED', 'SUCCESSED', 'REFUNDED']
  }
}); // orderSchema.set('toJSON', {
//     transform: function (doc, ret, options) {
//         ret.id = ret._id;
//         delete ret._id;
//         delete ret.__v;
//     }
// });
//const autoIncrement = autoIncrementSQ(mongoose.connection);

orderSchema.plugin(autoIncrementSQ, {
  inc_field: "order_id"
});
orderSchema.plugin(_mongooseI18nLocalize["default"], {
  locales: ['ar', 'en']
});

var _default = _mongoose["default"].model('order', orderSchema);

exports["default"] = _default;