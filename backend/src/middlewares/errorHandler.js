const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = (error.message || "").slice(0, 50);

  res.status(status).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
