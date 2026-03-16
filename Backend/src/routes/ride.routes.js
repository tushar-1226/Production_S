const express = require('express');
const router = express.Router();
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/create-rides',authMiddleware,rideController.createRide)
router.patch("/:rideId/accept", authMiddleware, rideController.acceptRide)
router.post("/:rideId/verify-otp", authMiddleware, rideController.verifyOtp)
router.patch("/:rideId/start", authMiddleware, rideController.startRide)
router.patch("/:rideId/request-complete", authMiddleware, rideController.requestComplete)
router.patch("/:rideId/rider-confirm-complete", authMiddleware, rideController.riderConfirmComplete)
router.patch("/:rideId/completed", authMiddleware, rideController.completeRide)
router.get("/pending-rides", authMiddleware, rideController.getPendingRides)
router.get("/accepted-rides", authMiddleware, rideController.getAcceptedRidesOfDriverInfo)
router.get("/accepted-rides-rider", authMiddleware, rideController.getAcceptedRidesOfRiderInfo)

module.exports = router;