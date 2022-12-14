import mongoose, {
  Schema
} from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const items_category = new Schema({
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
  kenf_collection: {
    type: String,
  },
  abbreviation: {
    type: String,
  },
  images: {
    type: [Number],
    ref: 'upload'
  },
  isKenf: {
    type: Boolean,
    default: false,
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

items_category.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

items_category.plugin(autoIncrementSQ, {
  id: "items_category_id",
  inc_field: "_id"
});
items_category.plugin(mongooseI18nLocalize, {
  locales: ['ar', 'en']
});

export default mongoose.model('items_category', items_category);
