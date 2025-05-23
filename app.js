const express = require('express');
const blogRoutes = require('./routes/blog.routes');
const UserRoutes = require("./routes/user.routes");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}))

app.use('/blog', blogRoutes);
app.use('/user', UserRoutes);

module.exports = app;