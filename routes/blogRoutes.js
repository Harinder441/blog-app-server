const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const locationMiddleware = require('../middleware/locationMiddleware');

router.use(locationMiddleware);

router.post('/', authMiddleware.authenticateToken, locationMiddleware, blogController.createBlog);
router.put('/:id', authMiddleware.authenticateToken, locationMiddleware, blogController.updateBlog);
router.get('/', authMiddleware.authenticateToken,locationMiddleware, blogController.getBlogsByLocation);
router.get('/:id', authMiddleware.authenticateToken, blogController.getBlogById);
router.delete('/:id', authMiddleware.authenticateToken, blogController.deleteBlog);
router.post('/preview', authMiddleware.authenticateToken, locationMiddleware, blogController.previewBlog);

module.exports = router;