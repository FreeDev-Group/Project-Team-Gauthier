const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Le nom est requis'),
    body('email').isEmail().withMessage('Un e-mail valide est requis'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit comporter au moins 6 caractères'),
  ],
  validateRequest,
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Un e-mail valide est requis'),
    body('password').notEmpty().withMessage('Le mot de passe est requis'),
  ],
  validateRequest,
  authController.login
);

// Protéger toutes les routes après ce middleware
router.use(protect);

router.get('/me', authController.getMe);

module.exports = router;
