require("dotenv").config({ path: "./.env" });
const express = require("express");
const cookieParser = require("cookie-parser");
const blogRoutes = require("./routes/blog.routes");
const UserRoutes = require("./routes/user.routes");
const cors = require("cors");
const globalErrorHandler = require("./utils/globalErrorHandler");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/v2/blog", blogRoutes);
app.use("/api/v2/user", UserRoutes);

app.use(globalErrorHandler);
module.exports = app;
