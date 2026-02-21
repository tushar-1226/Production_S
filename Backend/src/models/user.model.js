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

    phone: {
        type: String,
        unique: true,
        sparse: true   
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

const userModel = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = userModel