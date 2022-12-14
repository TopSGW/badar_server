"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mongoose = require('mongoose'); //var mongoose_auto_increment = require('mongoose-auto-increment');


var autoIncrementSQ = require('mongoose-sequence')(mongoose);

var Schema = mongoose.Schema;
var systemSchema = new Schema({
  _id: {
    type: Number
  },
  app_name: {
    type: String
  },
  phone: {
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
  address: {
    type: String
  },
  vat: {
    type: Number
  },
  vat_number: {
    type: String
  },
  commission: {
    type: Number
  },
  currency: {
    type: String
  },
  logo: {
    type: String
  }
}, {
  timestamps: false
});
systemSchema.set('toJSON', {
  transform: function transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
}); // messageSchema.plugin(autoIncrementSQ , { id: "message_id", inc_field: "_id" });

var systemInfo = mongoose.model('system_info', systemSchema);
var _default = systemInfo;
exports["default"] = _default;