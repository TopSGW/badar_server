var mongoose = require('mongoose');
const autoIncrementSQ = require('mongoose-sequence')(mongoose);

var Schema = mongoose.Schema;

var terms = {
  text_ar: {
    type: String,
  },
  text_en: {
    type: String,
  },
}

var termsSchema = new Schema(terms, {
  timestamps: true
});
termsSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

var systemInfo = mongoose.model('terms', termsSchema);

export default systemInfo;
