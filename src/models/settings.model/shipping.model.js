import mongoose, {
  Schema
} from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const shipping = new Schema({
  _id: {
    type: Number,
    required: true
  },
  company: {
    type: String
  },
  price: {
    type: Number
  },
  time: {
    type: String
  },
  deleted: {
    type: Boolean,
    default: false
  },

}, {
  timestamps: true
});

shipping.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

shipping.plugin(autoIncrementSQ, {
  id: "shipping_id",
  inc_field: "_id"
});
shipping.plugin(mongooseI18nLocalize, {
  locales: ['ar', 'en']
});

export default mongoose.model('shipping', shipping);
