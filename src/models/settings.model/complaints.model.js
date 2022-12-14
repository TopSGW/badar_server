import mongoose, {
  Schema
} from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const complaints = new Schema({
  _id: {
    type: Number,
    required: true
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  complaints: {
    type: String,
  },
  images: {
    type: Object(Number),
    ref: 'upload'
  },
  answer: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false
  },

}, {
  timestamps: true
});

complaints.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

complaints.plugin(autoIncrementSQ, {
  id: "complaints_id",
  inc_field: "_id"
});
complaints.plugin(mongooseI18nLocalize, {
  locales: ['ar', 'en']
});

export default mongoose.model('complaints', complaints);
