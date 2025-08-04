require('dotenv').config();  // Load .env variables
const mongoose = require('mongoose');
const User = require('./models/User'); // adjust the path if needed

const MONGO_URI = process.env.MONGO_URI;  // Make sure your .env has MONGO_URI=<your_uri>

async function clearUsers() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await User.deleteMany({});
    console.log('All users deleted!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error clearing users:', err);
  }
}

clearUsers();
