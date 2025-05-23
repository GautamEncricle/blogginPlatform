const express = require('express');
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blog.controller');
const router = express.Router();


router.route('/').get(getAllBlogs);
router.route('/getAll/:id').get(getBlogById);
router.route('/create').post(createBlog);
router.route('/update/:id').patch(updateBlog);
router.route('/delete/:id').delete(deleteBlog);

module.exports = router;