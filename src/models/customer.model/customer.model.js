import mongoose, {
  Schema
} from "mongoose";
import mongooseI18n from 'mongoose-i18n-localize'

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const CustomerSchema = new Schema({
  _id: {
    type: Number,
    required: true,
    default: 0
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

CustomerSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

CustomerSchema.plugin(mongooseI18n, {
  locales: ['en', 'ar']
});
CustomerSchema.plugin(autoIncrementSQ, {
  id: "customer_id",
  inc_field: "_id"
});

export default mongoose.model('customer', CustomerSchema);
