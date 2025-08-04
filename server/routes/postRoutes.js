const express = require('express');
const { createPost, getAllPosts, getUserWithPosts } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', protect, createPost);
router.get('/user/:id', getUserWithPosts);

module.exports = router;
