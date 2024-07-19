const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, verifyEmail, getUsers, updateUserRole } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getUserProfile);
router.get('/verify-email/:token', verifyEmail);
router.get('/', authenticate, admin, getUsers);
router.put('/update-role', authenticate, admin, updateUserRole);

module.exports = router;
