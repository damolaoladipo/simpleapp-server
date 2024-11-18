import express from 'express';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
  profile,
} from '../../controllers/auth.controller';
import checkAuth from '../../middlewares/auth.mdw';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/logout', logout);
router.get('/profile', checkAuth, profile);

export default router;
