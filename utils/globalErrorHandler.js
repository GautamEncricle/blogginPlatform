module.exports = function (err, req, res, next) {
  if (err) {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Error";
    err.message = err.message || "Something went wrong !";

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};
