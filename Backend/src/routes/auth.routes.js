const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/send-email-otp', authController.sendEmailOtp)
router.post('/verify-email-otp', authController.verifyEmailOtp)
router.post('/save-name', authController.saveName)
router.post('/terms-condition',authController.termsCondition)
router.post('/register-password', authController.registerPassword)
router.post('/send-login-otp', authController.sendLoginOtp)
router.get('/logout', authController.logoutUser)


module.exports = router;