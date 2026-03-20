const express = require('express');
const { body } = require('express-validator');

const blogController = require('../controllers/blogController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const validateRequest = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

// Protéger toutes les routes ci-dessous
router.use(protect);
router.use(restrictTo('admin', 'editor')); // Exemple de rôles autorisés à gérer les blogs

router.post(
  '/',
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Le titre du blog est requis'),
    body('content').notEmpty().withMessage('Le contenu du blog est requis')
  ],
  validateRequest,
  blogController.createBlog
);

router.patch(
  '/:id',
  upload.single('image'),
  [
    body('title').optional().notEmpty().withMessage('Le titre du blog ne peut pas être vide'),
    body('content').optional().notEmpty().withMessage('Le contenu du blog ne peut pas être vide')
  ],
  validateRequest,
  blogController.updateBlog
);

router.delete('/:id', blogController.deleteBlog);

module.exports = router;
