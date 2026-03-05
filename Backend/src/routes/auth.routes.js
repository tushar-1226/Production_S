const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware')

router.post('/send-email-otp', authController.sendEmailOtp)
router.post('/verify-email-otp', authController.verifyEmailOtp)
router.post('/save-name', authController.saveName)
router.post('/terms-condition',authController.termsCondition)
router.post('/register-password', authController.registerPassword)
router.post('/send-login-otp', authController.sendLoginOtp)
router.post('/verify-login-otp', authController.verifyLoginOtp)
router.get('/logout', authController.logoutUser)
router.get("/me", authMiddleware, authController.roleBasedAuth)


module.exports = router;