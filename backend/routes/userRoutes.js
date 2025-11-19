import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  addUserAddress,
  getUsers,
  deleteUser,
  updateUser,
  becomeSeller
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/become-seller', protect, becomeSeller);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.put('/password', protect, updateUserPassword);
router.post('/address', protect, addUserAddress);
router.route('/').get(protect, admin, getUsers);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

export default router;
