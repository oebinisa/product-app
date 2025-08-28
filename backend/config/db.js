// config/db.js
const { Sequelize } = require("sequelize");

// Load environment variables
require("dotenv").config();

// Create Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Username
  process.env.DB_PASS, // Password
  process.env.DATABASE_URL,
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    dialect: "postgres", // We are using PostgreSQL
    logging: false, // Disable SQL logs for cleaner output
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Render requires SSL
      },
    },
  }
);

// Function to test connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connected!");
  } catch (error) {
    console.error("❌ PostgreSQL Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
