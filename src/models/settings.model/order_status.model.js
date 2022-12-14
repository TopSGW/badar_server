import mongoose, {
  Schema
} from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const order_status = new Schema({
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

order_status.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});


order_status.plugin(autoIncrementSQ, {
  id: "order_status_id",
  inc_field: "_id"
});
order_status.plugin(mongooseI18nLocalize, {
  locales: ['ar', 'en']
});

export default mongoose.model('order_status', order_status);
