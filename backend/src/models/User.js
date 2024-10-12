const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 4,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    watchlist: [
      {
        imdbID: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        poster: {
          type: String,
          required: true,
        },
        year: {
          type: String,
          required: true,
        },
        director: {
          type: String,
          required: true,
        },
        actors: {
          type: String,
          required: true,
        },
        plot: {
          type: String,
          required: true,
        },
        imdbRating: {
          type: String,
          required: true,
        },
        imdbVotes: {
          type: String,
          required: true,
        },
        runtime: {
          type: String,
          required: true,
        },
        userRating: {
          type: Number,
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { minimize: false }
);

User.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

User.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', User);
