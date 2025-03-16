const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ message: 'Error getting users', error });
  }
});


router.post('/signup', async (req, res) => {
  try {
    const { username, password, instrument, role } = req.body;

    if (!username || !password || !instrument) {
      return res.json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ message: 'Username already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      instrument,
      role,
    });
    await newUser.save();

    res.json({ message: 'User created successfully' });
  } catch (error) {
    res.json({ message: 'Error creating user', error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: 'Incorrect username or password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    res.json({
      token,
      user: {
        username: user.username,
        role: user.role,
        instrument: user.instrument,
      },
    });
  } catch (error) {
    res.json({ message: 'Error logging in', error });
  }
});

module.exports = router;
