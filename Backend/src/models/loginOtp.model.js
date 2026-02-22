const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },

    tempToken: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300   // ⏳ 300 seconds = 5 minutes
    }
})

const otpModel = mongoose.model('OTP', otpSchema)

module.exports = otpModel