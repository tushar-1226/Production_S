const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },

    phone: {
        type: String,
        unique: true,
        sparse: true   // allows multiple null values
    },

    isPhoneVerified: {
        type: Boolean,
        default: false
    },

    firstName: {
        type: String,
        trim: true
    },

    lastName: {
        type: String,
        trim: true
    },

    authMethod: {
        type: String,
        enum: ['phone', 'passkey'],
        default: 'phone'
    },
    roles: {
        type: [String],
        enum: ['rider', 'driver', 'admin'],
        default: ['rider']
    }

}, {
    timestamps: true   // adds createdAt & updatedAt automatically
})

module.exports = mongoose.model('User', userSchema)