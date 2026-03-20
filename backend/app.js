const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

// db n'est pas utilisé directement ici
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./middleware/errorMiddleware');

// Importation des routes
const routes = require('./routes/index');

const app = express();

// 1) MIDDLEWARES GLOBAUX
// Définition des en-têtes HTTP de sécurité
app.use(helmet());

// Cross-Origin Resource Sharing (Partage de ressources entre origines multiples)
app.use(cors());

// Journalisation en mode développement
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limitation des requêtes provenant de la même API
const limiter = rateLimit({
  max: 100, // 100 requêtes par heure
  windowMs: 60 * 60 * 1000,
  message: 'Trop de requêtes depuis cette adresse IP, veuillez réessayer dans une heure !'
});
app.use('/api', limiter);

// Analyseur de corps, lit les données du corps dans req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Assainissement des données contre les attaques XSS
app.use(xss());

// Service des fichiers statiques (pour les images téléchargées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 2) ROUTES
app.use('/api/v1', routes);

// Gestion des routes non trouvées
app.all('*', (req, res, next) => {
  next(new AppError(`Impossible de trouver ${req.originalUrl} sur ce serveur !`, 404));
});

// 3) MIDDLEWARE DE GESTION DES ERREURS
app.use(globalErrorHandler);

module.exports = app;
