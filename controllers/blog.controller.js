const Blog = require('../models/blog.model');

//get all blogs
exports.getAllBlogs = async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    if (!blogs) {
        return res.status(500).json({
            statusCode: 'Failed',
            message: "Failed to get blogs!"
        })
    }
    res.status(200).json({
        statusCode: 'success',
        message: 'blogs fetched successfully',
        blogs
    })
}

exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params(id);
        const blog = await Blog.findById(id);
        if (!blogs) {
            return res.status(500).json({
                statusCode: 'Failed',
                message: "Failed to get blogs!"
            })
        }
        res.status(200).json({
            statusCode: 'success',
            message: 'blogs fetched successfully',
            blogs
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 'Failed',
            message: "Failed to get blogs!",
            error
        })
    }
}

exports.createBlog = async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);

        if (!newBlog) {
            return res.status(500).json({
                statusCode: 'Failed',
                message: "Failed to create blog!"
            })
        }

        res.status(201).json({
            statusCode: 'success',
            message: 'blog created successfully'
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 'Failed',
            message: "Something went wrong!",
            error
        })
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params(id);
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        if (!updatedBlog) {
            return res.status(500).json({
                statusCode: 'Failed',
                message: "Failed to update blog!"
            })
        }
        res.status(200).json({
            statusCode: 'success',
            message: 'blog updated successfully',
            updatedBlog
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 'Failed',
            message: "Something went wrong!",
            error
        })
    }
}

//delete blog
exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params(id);
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(500).json({
                statusCode: 'Failed',
                message: "Failed to delete blog!"
            })
        }
        res.status(200).json({
            statusCode: 'success',
            message: 'blog deleted successfully',
            deletedBlog
        })
    }
    catch (error) {
        return res.status(500).json({
            statusCode: 'Failed',
            message: "Something went wrong!",
            error
        })
    }
}