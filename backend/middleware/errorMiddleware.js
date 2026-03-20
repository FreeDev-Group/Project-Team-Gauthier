const AppError = require('../utils/AppError');

const handleJWTError = () => new AppError('Jeton invalide. Veuillez vous reconnecter !', 401);
const handleJWTExpiredError = () => new AppError('Votre jeton a expiré ! Veuillez vous reconnecter.', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Erreur opérationnelle, de confiance : envoyer le message au client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

  // Erreur de programmation ou autre erreur inconnue : ne pas divulguer les détails de l'erreur
  } else {
    // 1) Journaliser l'erreur
    console.error('ERREUR 💥', err);

    // 2) Envoyer un message générique
    res.status(500).json({
      status: 'erreur',
      message: 'Quelque chose a mal tourné !'
    });
  }
};

module.exports = (err, req, res, next) => {
  // Définir le code et le statut par défaut si aucun n'existe
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'erreur';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // gestion spécifique des erreurs courantes connues
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    
    // Gérer les erreurs de contraintes MySQL ou les requêtes mal formées
    if (error.code === 'ER_DUP_ENTRY') {
      const message = `Valeur de champ dupliquée saisie. Veuillez utiliser une autre valeur !`;
      error = new AppError(message, 400);
    }

    sendErrorProd(error, res);
  }
};
