const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

/**
 * Middleware qui intercepte et gère les erreurs de validation
 * des contrôles de `express-validator`
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Formater les erreurs en un dictionnaire lisible
    const errorMap = errors.array().reduce((acc, curr) => {
      acc[curr.path] = curr.msg;
      return acc;
    }, {});
    
    // Extraire les clés ou les valeurs pour montrer en tant que logique générale d'erreur
    return res.status(400).json({
      status: 'échec',
      message: 'La validation a échoué',
      errors: errorMap
    });
  }
  next();
};

module.exports = validateRequest;
