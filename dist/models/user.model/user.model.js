"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _isEmail = _interopRequireDefault(require("validator/lib/isEmail"));

var _mongooseI18nLocalize = _interopRequireDefault(require("mongoose-i18n-localize"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var autoIncrementSQ = require('mongoose-sequence')(_mongoose["default"]);

var userSchema = new _mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    "default": 0
  },
  email: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function validator(email) {
        return (0, _isEmail["default"])(email);
      },
      message: 'Invalid Email Syntax'
    }
  },
  password: {
    type: String
  },
  phoneVerified: {
    type: Boolean,
    "default": false
  },
  emailVerified: {
    type: Boolean,
    "default": false
  },
  name: {
    type: String
  },
  token: {
    type: String,
    required: false
  },
  status: {
    type: String,
    "enum": ['Pending', 'Active'],
    "default": 'Pending'
  },
  phone: {
    type: String
  },
  landline: {
    type: String,
    trim: true
  },
  deviceId: {
    type: String
  },
  confirmationCode: {
    type: String,
    unique: true
  },
  user_role: {
    type: Number,
    ref: "user_role",
    required: true
  },
  type: {
    type: String,
    "enum": ['ADMIN', 'USER'],
    required: true,
    "default": 'USER'
  },
  active: {
    type: Boolean,
    "default": true
  },
  deleted: {
    type: Boolean,
    "default": false
  } // city: { //المحافظة
  //   type: Number,
  //   ref: "place"
  // },
  ////////////////////////////////////////////////
  //
  // image: {
  //   type: String
  // },
  // notification: {
  //   type: Boolean,
  //   default: true
  // },
  // /////////////////////////////////////////
  // phones: [String],
  // // socialLinks:{
  // //     type: [{key:{type:String } , value:{type:String}}]
  // // },
  // searchKeys: [String],
  // views: {
  //   type: Number,
  //   default: 0
  // },
  // follow: {
  //   type: Boolean,
  //   default: false
  // },
  // favorite: {
  //   type: Boolean,
  //   default: false
  // },

}, {
  timestamps: true
}); //userSchema.index({ geoLocation: "2dsphere" });
// userSchema.pre('save', function (next) {
//     const account = this;
//     if (!account.isModified('password')) return next();
//     const salt = bcrypt.genSaltSync();
//     bcrypt.hash(account.password, salt).then(hash => {
//         account.password = hash;
//         next();
//     }).catch(err => console.log(err));
// });
// userSchema.methods.isValidPassword = function (newPassword, callback) {
//     let user = this;
//     bcrypt.compare(newPassword, user.password, function (err, isMatch) {
//         if (err)
//             return callback(err);
//         callback(null, isMatch);
//     });
// };

userSchema.set('toJSON', {
  transform: function transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret.password;
    delete ret._id;
    delete ret.__v;
  }
});
userSchema.plugin(_mongooseI18nLocalize["default"], {
  locales: ['en', 'ar']
});
userSchema.plugin(autoIncrementSQ, {
  id: "user_id",
  inc_field: "_id"
});

var _default = _mongoose["default"].model('user', userSchema);

exports["default"] = _default;