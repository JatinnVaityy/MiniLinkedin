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
  const posts = await Post.find()
    .populate('author', 'name bio') // include bio here as well, if needed
    .sort({ createdAt: -1 });
  res.json(posts);
};

export const getUserWithPosts = async (req, res) => {
  try {
    // Explicitly select bio (and name) from user
    const user = await User.findById(req.params.id).select('name bio');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch posts with author populated to get name and bio if needed
    const posts = await Post.find({ author: req.params.id })
      .populate('author', 'name bio')
      .sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(400).json({ error: 'User not found' });
  }
};
