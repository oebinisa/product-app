// backend/seed2.js
const { faker } = require("@faker-js/faker");
const Product = require("./models/productModel");
const { sequelize } = require("./config/db");

(async () => {
  try {
    console.log("⏳ Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Connection established.");

    // Reset DB
    await sequelize.sync({ force: true });
    console.log("🌱 Seeding products...");

    const products = [];
    for (let i = 0; i < 10; i++) {
      products.push({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()), // Ensure numeric
        inStock: faker.datatype.boolean(),
        imageUrl: `https://picsum.photos/300/300?random=${i + 1}`,
      });
    }

    await Product.bulkCreate(products);
    console.log(`✅ Database seeded with ${products.length} fake products.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    await sequelize
      .close()
      .catch(() =>
        console.warn("⚠️ Failed to close DB connection gracefully.")
      );
  }
})();
