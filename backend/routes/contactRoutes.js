const express = require('express');
const { body } = require('express-validator');

const contactController = require('../controllers/contactController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateMiddleware');

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Le nom est requis'),
    body('email').isEmail().withMessage('Un e-mail valide est requis'),
    body('subject').notEmpty().withMessage('Le sujet est requis'),
    body('message').notEmpty().withMessage('Le message est requis'),
  ],
  validateRequest,
  contactController.submitContact
);

// Protéger toutes les routes ci-dessous, restreindre aux administrateurs uniquement
router.use(protect);
router.use(restrictTo('admin'));

router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
