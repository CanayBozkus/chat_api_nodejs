const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    isSupportAgent: {
        type: Boolean,
        default: false
    }
}, { timestamps: { createdAt: 'createdAt' } })

module.exports = mongoose.model('User', UserSchema)