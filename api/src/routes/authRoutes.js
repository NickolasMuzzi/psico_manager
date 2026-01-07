const express = require('express');
const AuthController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const authController = new AuthController()
// Rotas públicas
router.post('/login', authController.login);
router.post('/register', authController.register);

// Rotas protegidas (precisam de token)
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;