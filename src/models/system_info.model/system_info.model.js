var mongoose = require('mongoose');
const autoIncrementSQ = require('mongoose-sequence')(mongoose);

var Schema = mongoose.Schema;

var systemSchema = new Schema({
  _id: {
    type: Number
  },
  app_name: {
    type: String,
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
  },
  region: {
    type: String,
  },
  zip: {
    type: String,
  },
  address: {
    type: String,
  },
  vat: {
    type: Number,
  },
  vat_number: {
    type: String,
  },
  commission: {
    type: Number,
  },
  currency: {
    type: String,
  },
  logo: {
    type: String,
  }}, {
    timestamps: false,
  });
systemSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

var systemInfo = mongoose.model('system_info', systemSchema);

export default systemInfo;
