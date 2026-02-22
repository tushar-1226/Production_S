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

    firstName: {
        type: String,
        trim: true
    },

    lastName: {
        type: String,
        trim: true
    },
     
    password: {
        type: String,
        required: true
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },

    termsAccepted: {
        type: Boolean,
        default: false
    },

    termsAcceptedAt: {
        type: Date
    },

    roles: {
        type: [String],
        enum: ['rider', 'driver', 'admin'],
        default: ['rider']
    }

}, {
    timestamps: true   // adds createdAt & updatedAt automatically
})

const userModel = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = userModel