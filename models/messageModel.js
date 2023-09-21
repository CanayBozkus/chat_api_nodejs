const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    from: {
        type: Schema.ObjectId,
        required: true
    },
    to: {
        type: Schema.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'createdAt' } })

module.exports = mongoose.model('Message', MessageSchema)