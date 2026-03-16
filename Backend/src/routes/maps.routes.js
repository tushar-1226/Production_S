const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const mapsController = require('../controllers/maps.controller');

router.get('/suggestions', authMiddleware, mapsController.getSuggestions);

module.exports = router;
