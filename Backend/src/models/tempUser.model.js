const mongoose = require('mongoose')

const tempUserSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    index: true
  },

  emailOtp: {
    type: String,
  },

  tempToken: {
    type: String,
    required: true,
    unique: true
  },

  emailOtpExpiry: {
    type: Date,
    },

  isEmailVerified: {
    type: Boolean,
    default: false
  },

  phone: {
    type: String,
    trim: true
  },

  phoneOtp: {
    type: String
  },

  phoneOtpExpiry: {
    type: Date
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
  }

}, {
  timestamps: true
})


// 🔥 TTL INDEX (Auto delete after 10 minutes)
tempUserSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 1200 }   // 10 minutes
)

const tempUserModel = mongoose.model('TempUser', tempUserSchema)

module.exports = tempUserModel