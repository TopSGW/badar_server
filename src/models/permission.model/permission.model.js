import mongoose, { Schema } from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const PermissionSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
      type: String,
      required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

PermissionSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

PermissionSchema.plugin(autoIncrementSQ , { id: "permission_id", inc_field: "_id" });
PermissionSchema.plugin(mongooseI18nLocalize, { locales: ['ar', 'en'] });

export default mongoose.model('permission', PermissionSchema);
