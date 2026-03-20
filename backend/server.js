require('dotenv').config();
const app = require('./app');
const pool = require('./config/database');

const PORT = process.env.PORT || 5000;

// Tester la connexion à la base de données avant de démarrer le serveur
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données MySQL :', err.message);
    process.exit(1);
  }
  if (connection) {
    console.log('✅ Connecté avec succès à la base de données MySQL');
    connection.release();
  }

  // Démarrer le serveur
  const server = app.listen(PORT, () => {
    console.log(`🚀 Le serveur fonctionne sur le port ${PORT} en mode ${process.env.NODE_ENV}`);
  });

  // Gérer les rejets de promesses non traités
  process.on('unhandledRejection', (err) => {
    console.error('REJET NON TRAITÉ ! 💥 Arrêt en cours...');
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
});

process.on('uncaughtException', (err) => {
  console.error('EXCEPTION NON CAPTURÉE ! 💥 Arrêt en cours...');
  console.error(err.name, err.message);
  process.exit(1);
});
