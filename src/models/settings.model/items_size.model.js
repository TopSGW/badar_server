import mongoose, {
  Schema
} from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const items_size = new Schema({
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
  unit: {
    type: String
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

items_size.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

items_size.plugin(autoIncrementSQ, {
  id: "items_size_id",
  inc_field: "_id"
});
items_size.plugin(mongooseI18nLocalize, {
  locales: ['ar', 'en']
});

export default mongoose.model('items_size', items_size);
