import Post from '../models/Post.js';
import User from '../models/User.js';

// Create Post
export const createPost = async (req, res) => {
  try {
    const post = new Post({
      content: req.body.content,
      author: req.user.id
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Could not create post' });
  }
};

// Get All Posts with Author's Name and Bio
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name bio') // show name and bio
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get User Profile and Posts
export const getUserWithPosts = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch user with name and bio
    const user = await User.findById(userId).select('name bio');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch posts written by the user
    const posts = await Post.find({ author: userId })
      .populate('author', 'name bio')
      .sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching user data' });
  }
};
