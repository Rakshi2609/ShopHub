import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, googleId } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    googleId: googleId || null
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isSeller: user.isSeller,
      sellerInfo: user.sellerInfo,
      googleId: user.googleId,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (user) {
    // For Google users, check if password matches googleId OR regular password
    const isPasswordMatch = user.googleId 
      ? (password === user.googleId || (user.password && await user.matchPassword(password)))
      : await user.matchPassword(password);

    if (isPasswordMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isSeller: user.isSeller,
        sellerInfo: user.sellerInfo,
        googleId: user.googleId,
        token: generateToken(user._id)
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  console.log('getUserProfile called');
  console.log('req.user:', req.user);
  
  if (!req.user) {
    res.status(401);
    throw new Error('User not authenticated');
  }

  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isSeller: user.isSeller,
      sellerInfo: user.sellerInfo,
      googleId: user.googleId,
      avatar: user.avatar,
      phone: user.phone,
      addresses: user.addresses
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    // Email cannot be changed
    user.phone = req.body.phone || user.phone;
    user.avatar = req.body.avatar || user.avatar;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isSeller: updatedUser.isSeller,
      sellerInfo: updatedUser.sellerInfo,
      avatar: updatedUser.avatar,
      phone: updatedUser.phone
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
export const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');

  if (user) {
    const { currentPassword, newPassword } = req.body;

    // Check if current password matches
    if (!(await user.matchPassword(currentPassword))) {
      res.status(401);
      throw new Error('Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Add user address
// @route   POST /api/users/address
// @access  Private
export const addUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { street, city, state, zipCode, country, isDefault } = req.body;

    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push({
      street,
      city,
      state,
      zipCode,
      country,
      isDefault
    });

    await user.save();
    res.status(201).json(user.addresses);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Become a seller
// @route   PUT /api/users/become-seller
// @access  Private
export const becomeSeller = asyncHandler(async (req, res) => {
  const { businessName, businessDescription } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.isSeller = true;
    user.sellerInfo = {
      businessName,
      businessDescription,
      rating: 0,
      totalSales: 0
    };

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isSeller: updatedUser.isSeller,
      sellerInfo: updatedUser.sellerInfo
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
