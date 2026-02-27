const mongoose = require('mongoose');















const rideSchema = new mongoose.Schema({

  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  rideType: {
    type: String,
    enum: ["for_me", "for_other"],
    default: "for_me"
  },

  otherPersonPhone: {
    type: String,
    required: function () {
      return this.rideType === "for_other"
    }
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
        type: [Number], // [lng, lat]
        required: true
      }
    }
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
        type: [Number], // [lng, lat]
        required: true
      }
    }
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

  startedAt: Date,
  completedAt: Date,
  cancelledAt: Date

}, { timestamps: true })

const rideModel = mongoose.model('Ride', rideSchema);

module.exports = rideModel;