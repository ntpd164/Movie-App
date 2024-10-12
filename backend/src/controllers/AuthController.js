const { data } = require('autoprefixer');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
// sign up with catch async

const signToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

class AuthController {
  async signUp(req, res, next) {
    try {
      console.log('JWT_SECRET', process.env.JWT_SECRET);
      console.log('JWT_EXPIRES_IN', process.env.JWT_EXPIRES_IN);

      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.status(201).json({
        status: 'success',
        token,
        data: {
          user: newUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return next(new Error('Please provide email and password'));
    }

    try {
      // Check if user exists && password is correct
      const user = await User.findOne({ email }).select('+password');

      if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new Error('Incorrect email or password'));
      }

      // Send token to client
      const token = signToken(user._id, user.name);
      res.status(200).json({
        status: 'success',
        token,
        // name: user.name,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
