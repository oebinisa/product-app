// models/productModel.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Define Product model
const Product = sequelize.define("Product",
  {
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "in_stock",
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Optional
      field: "image_url",
      validate: {
        isUrl: true, // Ensure it's a valid URL format
      },
    },
  },
  { 
    timestamps: true, 
    tableName: "products", 
    underscored: true, 
  }
);

module.exports = Product;
