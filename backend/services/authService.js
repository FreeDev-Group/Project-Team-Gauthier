const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new AppError('Cet e-mail est déjà utilisé', 400);
  }

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 12);
  const userId = await User.create({ name, email, password: hashedPassword, role: 'admin' });

  return userId;
};

exports.loginUser = async (email, password) => {
  // Vérifier si l'utilisateur existe
  const user = await User.findByEmail(email);
  if (!user) {
    throw new AppError('E-mail ou mot de passe incorrect', 401);
  }

  // Vérifier si le mot de passe est correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new AppError('E-mail ou mot de passe incorrect', 401);
  }

  // Générer le jeton JWT
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
};

exports.getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('Utilisateur introuvable', 404);
  }
  return user;
};
