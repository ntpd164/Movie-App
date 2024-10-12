// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    console.log('Received Token:', token);

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in!',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'User no longer exists.',
      });
    }

    req.user = currentUser; // Gắn user vào req.user
    next();
  } catch (err) {
    console.error('Middleware Error:', err);
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

module.exports = authMiddleware;
