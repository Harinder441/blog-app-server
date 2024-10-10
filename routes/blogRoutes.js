const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.authenticateToken, blogController.createBlog);
router.put('/:id', authMiddleware.authenticateToken, blogController.updateBlog);
router.get('/', blogController.getBlogsByLocation);
router.get('/:id', blogController.getBlogById);
router.delete('/:id', authMiddleware.authenticateToken, blogController.deleteBlog);

module.exports = router;