// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
