import mongoose, { Schema } from "mongoose";
import mongooseI18nLocalize from 'mongoose-i18n-localize'

const autoIncrementSQ = require('mongoose-sequence')(mongoose);

const NotifSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    resource: {
        type: Number,
        ref: 'user'
    },
    target: {
        type: Number,
        ref: 'user'
    },
    title:{
        type:String
    },
    subjectType:{
        type:String
    },
    subjectId:{
        type:String
    },
    text:{
        type:String
    },
    read:{
        type:Boolean,
        default:false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    users:{
        type: [Number],
        ref: 'user'
    },
    usersDeleted:{
        type: [Number],
        ref: 'user'
    },
    order:{
        type: Number,
        ref: 'order'
    },
    image:{
        type: String
    }
}, { timestamps: true });

NotifSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

NotifSchema.plugin(autoIncrementSQ , { id: "notif_id", inc_field: "_id" });
NotifSchema.plugin(mongooseI18nLocalize,{locales:['ar','en']});

export default mongoose.model('notification', NotifSchema);
