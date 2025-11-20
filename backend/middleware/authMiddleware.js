import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  console.log('Auth middleware - headers:', req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('Token extracted:', token?.substring(0, 20) + '...');

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded:', decoded);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      console.log('User found:', req.user ? req.user.email : 'null');

      if (!req.user) {
        res.status(401);
        throw new Error('User not found');
      }

      next();
    } catch (error) {
      console.error('Auth error:', error.message);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    console.log('No token provided');
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as admin');
  }
};
