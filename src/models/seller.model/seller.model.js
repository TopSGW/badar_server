import mongoose, { Schema } from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const sellerSchema = new Schema({
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
    phone: {
      type: String,
    },
    email: {
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
    address_ar: {
      type: String,
    },
    address_en: {
      type: String,
    },
    description_ar: {
      type: String,
    },
    description_en: {
      type: String,
    },
    documents: {
      type: [Number],
      ref: 'upload'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },

}, { timestamps: true });

sellerSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});


sellerSchema.plugin(autoIncrementSQ , { id: "seller_id", inc_field: "_id" });
sellerSchema.plugin(mongooseI18nLocalize, { locales: ['ar', 'en'] });

export default mongoose.model('seller', sellerSchema);
