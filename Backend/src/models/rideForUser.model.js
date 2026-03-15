const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  riderFirstName: {
    type: String,
    required: true
  },

  riderLastName: {
    type: String,
    required: true
  },
  
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  driverFirstName: {
    type: String,
    default: null
  },

  driverLastName: {
    type: String,
    default: null
  },
  
  rideType: {
    type: String,
    enum: ["for_me", "for_other"],
    default: "for_me"
  },

  otherRider: {
    firstName: String,
    lastName: String,
    phone: String,
  },

  pickup: {
    address: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },

  isRideActive:{
    type:Boolean,
    default:false
  },

  drop: {
    address: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number], 
        required: true
      }
    }
  },

  vehicleType: {
    type: String,
    required: true
  },

  distance: {
    type: Number,
    default: 0
  },

  scheduledTime: {
    type: Date,
    default: Date.now
  },

  fare: {
    estimated: {
      type: Number,
      default: 0
    },
    final: {
      type: Number,
      default: 0
    }
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "started", "completed", "cancelled"],
    default: "pending"
  },

  otp: {
    type: String,
    default: null
  },

  startedAt: Date,
  completedAt: Date,
  cancelledAt: Date

}, { timestamps: true })

const rideModel = mongoose.model('Ride', rideSchema);

module.exports = rideModel;