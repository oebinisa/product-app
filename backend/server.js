// backend/server.js
require("dotenv").config(); // Load environment variables

// Import necessary packages
const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const apiRoutes = require("./routes/apiRoutes");
const productRoutes = require("./routes/productRoutes"); 
const User = require("./models/userModel"); 
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Initialize the app
const app = express();

// Use port from .env or default to 5000
const PORT = process.env.PORT || 5000;

// CORS middleware (add this BEFORE other middleware)
app.use(cors()); // ← Add this line

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(logger);

// Routes
// Example route
app.get("/", (req, res) => {
  res.send("API is running and connected to PostgreSQL!");
});

// Mount API routes under /api
app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); 
app.use("/api/users", userRoutes); // ← Now admin-protected


// Error handling middleware (MUST come after all routes)
// 404 handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error); // Send to errorHandler
});

// Global error handler 
app.use(errorHandler);

// Connect and sync database
connectDB();

sequelize
  .sync({ alter: true }) 
  .then(() => console.log("✅ Database synchronized"))
  .catch((err) => console.error("❌ Sync failed:", err.message));

// Start server
app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;