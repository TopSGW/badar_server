import mongoose, { Schema } from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const UserRoleSchema = new Schema({
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
    permissions: [{
      permission: String,
      group: String,
    }],
    active: {
      type: Boolean,
      default: true
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

UserRoleSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

UserRoleSchema.plugin(autoIncrementSQ , { id: "user_role_id", inc_field: "_id" });
UserRoleSchema.plugin(mongooseI18nLocalize, { locales: ['ar', 'en'] });

export default mongoose.model('user_role', UserRoleSchema);
