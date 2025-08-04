require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post'); // adjust path

const MONGO_URI = process.env.MONGO_URI; // your Mongo URI in .env

async function clearPosts() {
  try {
    await mongoose.connect(MONGO_URI);
    await Post.deleteMany({});
    console.log('All posts deleted!');
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

clearPosts();
