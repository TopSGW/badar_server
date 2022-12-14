import mongoose, {
  Schema
} from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import mongooseI18n from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  confirmationCode: {
      type: String,
      unique: true
  },
  address: {
      fullname: {
        type: String
      },
      phone: {
        type: String
      },
      email: {
        type: String
      },
      country: {
        type: String
      },
      city: {
        type: String
      },
      zipCode: {
        type: String
      },
      street: {
        type: String
      }
  },
  billingAddress: {
      fullname: {
        type: String
      },
      phone: {
        type: String
      },
      email: {
        type: String
      },
      country: {
        type: String
      },
      city: {
        type: String
      },
      zipCode: {
        type: String
      },
      street: {
        type: String
      }
  },
  favorite: {
      type: [Number],
      ref: 'product'
  },
  cart: {
      type: [Number],
      ref: 'product'
  },
  cardNumber: {
      type: String
  },
  cardExpire: {
      type: String
  },
  cardCVV: {
      type: String
  },
  cardType: {
      type: String,
      enum: ['credit', 'mada']
  },
  type: {
    type: String,
    enum: ['Admin', 'User'],
    required: true,
    default: 'User'
  },
  status: {
    type: String,
    enum: ['Pending', 'Active'],
    default: 'Pending'
  },
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

// userSchema.set('toJSON', {
//   transform: function(doc, ret, options) {
//     ret.id = ret._id;
//     delete ret.password;
//     delete ret._id;
//     delete ret.__v;
//   }
// });

// userSchema.plugin(mongooseI18n, {
//   locales: ['en', 'ar']
// });

// userSchema.plugin(autoIncrementSQ, {
//   id: "user_id",
//   inc_field: "_id"
// });

export default mongoose.model('user', userSchema);
