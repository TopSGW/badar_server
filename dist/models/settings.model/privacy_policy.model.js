"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mongoose = require('mongoose'); //var mongoose_auto_increment = require('mongoose-auto-increment');


var autoIncrementSQ = require('mongoose-sequence')(mongoose);

var Schema = mongoose.Schema;
var privacy_policy = {
  text_ar: {
    type: String
  },
  text_en: {
    type: String
  }
};
var privacyPolicySchema = new Schema(privacy_policy, {
  timestamps: true
});
privacyPolicySchema.set('toJSON', {
  transform: function transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
}); // messageSchema.plugin(autoIncrementSQ , { id: "message_id", inc_field: "_id" });

var systemInfo = mongoose.model('privacy_policy', privacyPolicySchema);
var _default = systemInfo;
exports["default"] = _default;