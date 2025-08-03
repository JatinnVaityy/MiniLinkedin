const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
 bio: { type: String, default: 'No bio provided' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
