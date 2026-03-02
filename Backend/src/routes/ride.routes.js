const express = require('express');
const router = express.Router();
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/create-rides',authMiddleware,rideController.createRide)
router.patch("/:rideId/accept", authMiddleware, rideController.acceptRide)
router.patch("/:ride/start", authMiddleware, rideController.startRide)
router.patch("/:ride/completed", authMiddleware, rideController.completeRide)


module.exports = router;