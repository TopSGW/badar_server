import mongoose, {
  Schema
} from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const upload = new Schema({
  _id: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
  },

  link: {
    type: String,
  },
  file_type: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false
  },

}, {
  timestamps: true
});

upload.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

upload.plugin(autoIncrementSQ, {
  id: "upload_id",
  inc_field: "_id"
});
upload.plugin(mongooseI18nLocalize, {
  locales: ['ar', 'en']
});

export default mongoose.model('upload', upload);
