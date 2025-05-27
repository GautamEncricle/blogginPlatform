const Blog = require("../models/blog.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

//get all blogs
exports.getAllBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  if (!blogs) {
    return next(new ApiError(500, "Failed to get blogs!"));
  }
  res.status(200).json({
    statusCode: "success",
    message: "blogs fetched successfully",
    blogs,
  });
});

exports.getBlogById = asyncHandler(async (req, res, next) => {
  const { id } = req.params(id);
  const blog = await Blog.findById(id);
  if (!blogs) {
    return next(new ApiError(500, "Failed to get blogs!"));
  }
  res.status(200).json({
    statusCode: "success",
    message: "blogs fetched successfully",
    blogs,
  });
});

exports.createBlog = asyncHandler(async (req, res, next) => {
  const newBlog = await Blog.create(req.body);

  if (!newBlog) {
    return next(new ApiError(500, "Failed to create blog !"));
  }

  res.status(201).json({
    statusCode: "success",
    message: "blog created successfully",
  });
});

exports.updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params(id);
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedBlog) {
    return next(new ApiError(500, "Failed to update blog!"));
  }
  res.status(200).json({
    statusCode: "success",
    message: "blog updated successfully",
    updatedBlog,
  });
});

//delete blog
exports.deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params(id);
  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (!deletedBlog) {
    return next(new ApiError(500, "Failed to delete blog!"));
  }
  res.status(200).json({
    statusCode: "success",
    message: "blog deleted successfully",
    deletedBlog,
  });
});
