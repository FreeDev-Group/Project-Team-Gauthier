const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const protect = catchAsync(async (req, res, next) => {
  // 1) Obtenir le jeton et vérifier s'il est là
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Vous n\'êtes pas connecté ! Veuillez vous connecter pour obtenir l\'accès.', 401));
  }

  // 2) Vérification du jeton
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Vérifier si l'utilisateur existe toujours
  const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [decoded.id]);
  const currentUser = users[0];

  if (!currentUser) {
    return next(new AppError('L\'utilisateur appartenant à ce jeton n\'existe plus.', 401));
  }

  // Accorder l'accès à la route protégée, en injectant l'utilisateur à l'objet de requête
  req.user = currentUser;
  next();
});

// Middleware pour restreindre l'accès à des rôles spécifiques (ex. admin)
const restrictTo = (...roles) => {
  return (req, res, next) => {
    // On suppose que le rôle de l'utilisateur est stocké comme une simple chaîne de caractères dans la base.
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Vous n\'avez pas la permission d\'effectuer cette action', 403));
    }
    next();
  };
};

module.exports = { protect, restrictTo };
