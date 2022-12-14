import mongoose, {
  Schema
} from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const payment_method = new Schema({
  _id: {
    type: Number,
    required: true
  },
  name_ar: {
    type: String,
  },
  name_en: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

payment_method.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

payment_method.plugin(autoIncrementSQ, {
  id: "payment_method_id",
  inc_field: "_id"
});
payment_method.plugin(mongooseI18nLocalize, {
  locales: ['ar', 'en']
});

export default mongoose.model('payment_method', payment_method);
