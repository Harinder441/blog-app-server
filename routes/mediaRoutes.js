const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const authMiddleware = require('../middleware/authMiddleware');
const locationMiddleware = require('../middleware/locationMiddleware');

router.use(locationMiddleware);

router.post('/upload', authMiddleware.authenticateToken, mediaController.uploadMedia);

module.exports = router;