import mongoose, { Schema } from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const shopSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    seller_id: {
      type: String,
    },
    app_name_ar: {
      type: String,
    },
    app_abbreviation: {
      type: String,
    },
    email: {
      type: String,
    },
    app_name_en: {
      type: String,
    },
    phone: {
      type: String,
    },
    mobile: {
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
    commission: {
      type: Number,
    },
    images: {
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

shopSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

shopSchema.plugin(autoIncrementSQ , { id: "shop_id", inc_field: "_id" });
shopSchema.plugin(mongooseI18nLocalize, { locales: ['ar', 'en'] });

export default mongoose.model('shop', shopSchema);
