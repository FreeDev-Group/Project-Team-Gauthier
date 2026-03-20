const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/responseFormatter');

exports.register = catchAsync(async (req, res, next) => {
  const userId = await authService.registerUser(req.body);
  sendResponse(res, 201, 'Utilisateur inscrit avec succès', { userId });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const authData = await authService.loginUser(email, password);
  sendResponse(res, 200, 'Connexion réussie', authData);
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await authService.getUserProfile(req.user.id);
  sendResponse(res, 200, 'Profil récupéré avec succès', { user });
});
