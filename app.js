const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog.model');
const blogRoutes = require('./routes/blog.routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}))

app.use('/blog', blogRoutes);

module.exports = app;