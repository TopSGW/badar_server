import mongoose, {
  Schema
} from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const units = new Schema({
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

units.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

units.plugin(autoIncrementSQ, {
  id: "units_id",
  inc_field: "_id"
});
units.plugin(mongooseI18nLocalize, {
  locales: ['ar', 'en']
});

export default mongoose.model('units', units);
