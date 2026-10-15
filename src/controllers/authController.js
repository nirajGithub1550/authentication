// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Helper: Sign JWT
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// 1. SIGNUP
export const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = signToken(newUser._id);
  newUser.password = undefined; // Don't expose password in response

  res.status(201).json({
    status: 'success',
    token,
    data: { user: newUser },
  });
});

// 2. LOGIN
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Validate body
  if (!email || !password) {
    return next(new AppError('Please provide both email and password', 400));
  }

  // 2. Check if user exists (explicitly select password because select: false)
  const user = await User.findOne({ email }).select('+password');

  // 3. Verify user and password match
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 4. Issue token
  const token = signToken(user._id);
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: { user },
  });
});