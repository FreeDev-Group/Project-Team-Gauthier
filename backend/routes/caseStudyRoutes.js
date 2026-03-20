const express = require('express');
const { body } = require('express-validator');

const caseStudyController = require('../controllers/caseStudyController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const validateRequest = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/', caseStudyController.getAllCaseStudies);
router.get('/:id', caseStudyController.getCaseStudyById);

// Protéger les routes ci-dessous
router.use(protect);
router.use(restrictTo('admin')); // Seuls les administrateurs créent des études de cas

router.post(
  '/',
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Le titre est requis'),
    body('client_name').notEmpty().withMessage('Le nom du client est requis'),
    body('industry').notEmpty().withMessage('L\'industrie est requise'),
    body('challenge').notEmpty().withMessage('La description du défi est requise'),
    body('solution').notEmpty().withMessage('La description de la solution est requise'),
    body('results').notEmpty().withMessage('Les résultats sont requis')
  ],
  validateRequest,
  caseStudyController.createCaseStudy
);

router.patch(
  '/:id',
  upload.single('image'),
  validateRequest, 
  caseStudyController.updateCaseStudy
);

router.delete('/:id', caseStudyController.deleteCaseStudy);

module.exports = router;
