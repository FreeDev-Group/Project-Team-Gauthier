const Blog = require('../models/Blog');
const AppError = require('../utils/AppError');

exports.createBlog = async (blogData) => {
  const blogId = await Blog.create(blogData);
  return await Blog.findById(blogId);
};

exports.getAllBlogs = async () => {
  return await Blog.findAll();
};

exports.getBlogById = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError('Article de blog introuvable', 404);
  }
  return blog;
};

exports.updateBlog = async (id, blogData) => {
  const success = await Blog.update(id, blogData);
  if (!success) {
    throw new AppError('Article de blog introuvable ou aucune modification apportée', 404);
  }
  return await Blog.findById(id);
};

exports.deleteBlog = async (id) => {
  const success = await Blog.delete(id);
  if (!success) {
    throw new AppError('Article de blog introuvable', 404);
  }
  return true;
};
