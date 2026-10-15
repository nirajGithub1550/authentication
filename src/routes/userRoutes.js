// src/routes/userRoutes.js
import express from 'express';
import { signup, login } from '../controllers/authController.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes (Anyone can access)
router.post('/signup', signup);
router.post('/login', login);

// Protected routes (Must pass a valid JWT token)
router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUserById);
router.patch('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

export default router;