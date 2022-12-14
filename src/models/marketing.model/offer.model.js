import mongoose, {
  Schema
} from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const offer = new Schema({
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
  description_ar: {
    type: String,
  },
  description_en: {
    type: String,
  },
  discount: {
    type: Number,
  },
  start_date: {
    type: String,
  },
  end_date: {
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

offer.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

offer.plugin(autoIncrementSQ, {
  id: "offer_id",
  inc_field: "_id"
});

offer.plugin(mongooseI18nLocalize, {
  locales: ['ar', 'en']
});

export default mongoose.model('offer', offer);
