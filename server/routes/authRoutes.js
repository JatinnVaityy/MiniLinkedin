const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Make sure User model is imported

const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', getUserProfile);

router.put('/update/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { bio: req.body.bio },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Wrap updatedUser in { user: updatedUser } to match frontend expectation
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});

module.exports = router;
