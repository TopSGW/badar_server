import mongoose, {
  Schema
} from "mongoose";
const autoIncrementSQ = require('mongoose-sequence')(mongoose);
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const coupon = new Schema({
  _id: {
    type: Number,
    required: true
  },
  user: {
    type: String
  },
  code: {
    type: String,
  },
  discount_type: {
    type: String,
    enum: ['percent', 'fixed']
  },
  discount: {
    type: Number,
  },
  max_discount: {
    type: Number
  },
  profit: {
    type: Number
  },
  profit_type: {
    type: String,
    enum: ['percent', 'fixed']
  },
  total_purchase_condition: {
    type: Number
  },
  included_category: {
    type: Number,
    ref: 'items_category'
  },
  except_discounted_product: {
    type: Boolean,
    default: true
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

coupon.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

coupon.plugin(autoIncrementSQ, {
  id: "coupon_id",
  inc_field: "_id"
});
coupon.plugin(mongooseI18nLocalize, {
  locales: ['ar', 'en']
});

export default mongoose.model('coupon', coupon);
