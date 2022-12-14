import mongoose, {
  Schema
} from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const purity = new Schema({
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

purity.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

purity.plugin(autoIncrementSQ, {
  id: "purity_id",
  inc_field: "_id"
});
purity.plugin(mongooseI18nLocalize, {
  locales: ['ar', 'en']
});

export default mongoose.model('purity', purity);
