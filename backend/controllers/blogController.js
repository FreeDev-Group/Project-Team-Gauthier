const blogService = require('../services/blogService');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/responseFormatter');

exports.createBlog = catchAsync(async (req, res, next) => {
  // Ajouter author_id de l'utilisateur authentifié
  const blogData = { ...req.body, author_id: req.user.id };
  
  // Gérer le téléchargement de l'image si elle existe
  if (req.file) {
    blogData.image_url = `/uploads/${req.file.filename}`;
  }

  const blog = await blogService.createBlog(blogData);
  sendResponse(res, 201, 'Blog créé avec succès', { blog });
});

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await blogService.getAllBlogs();
  sendResponse(res, 200, 'Blogs récupérés avec succès', { blogs });
});

exports.getBlogById = catchAsync(async (req, res, next) => {
  const blog = await blogService.getBlogById(req.params.id);
  sendResponse(res, 200, 'Blog récupéré avec succès', { blog });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const blogData = { ...req.body };
  
  if (req.file) {
    blogData.image_url = `/uploads/${req.file.filename}`;
  }

  const blog = await blogService.updateBlog(req.params.id, blogData);
  sendResponse(res, 200, 'Blog mis à jour avec succès', { blog });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  await blogService.deleteBlog(req.params.id);
  sendResponse(res, 200, 'Blog supprimé avec succès');
});
