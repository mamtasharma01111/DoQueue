// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'User name is required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
    },
  },
  { timestamps: true }
);


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT
userSchema.methods.generateAccessToken = function () {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not set in environment variables');
  }

  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '100d' }
  );
};

const User = mongoose.model('User', userSchema);

module.exports = User;
