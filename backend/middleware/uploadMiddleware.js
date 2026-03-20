const multer = require('multer');
const AppError = require('../utils/AppError');
const fs = require('fs');
const path = require('path');

// S'assurer que le répertoire de téléchargements existe
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage de Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Vous pouvez séparer les dossiers selon les routes ici si nécessaire
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // format du nom de fichier : type_document-horodatage.ext
    const ext = file.mimetype.split('/')[1];
    cb(null, `img-${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`);
  }
});

// Filtre Multer pour accepter UNIQUEMENT les images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Ceci n\'est pas une image ! Veuillez télécharger uniquement des images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // limite de 5 Mo
  }
});

module.exports = upload;
