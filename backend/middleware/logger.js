// middleware/logger.js

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next(); // Proceed to next middleware or route
};

module.exports = logger;
