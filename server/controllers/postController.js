import Post from '../models/Post.js';
import User from '../models/User.js';

export const createPost = async (req, res) => {
  try {
    const post = new Post({
      content: req.body.content,
      author: req.user.id
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: 'Could not create post' });
  }
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'name').sort({ createdAt: -1 });
  res.json(posts);
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    const posts = await Post.find({ author: req.params.id }).sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (err) {
    res.status(400).json({ error: 'User not found' });
  }
};
