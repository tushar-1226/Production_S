const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/send-email-otp', authController.sendEmailOtp)
router.post('/verify-email-otp', authController.verifyEmailOtp)
router.post('/save-name', authController.saveName)
router.post('/terms-condition',authController.termsCondition)
// router.post('/send-phone-otp', authController.sendPhoneOtp)
// router.post('/verify-phone-otp', authController.verifyPhoneOtp)
router.post('/verify-password', authController.verifyPassword)

module.exports = router;