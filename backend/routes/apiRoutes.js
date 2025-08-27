// routes/apiRoutes.js

const express = require("express");
const router = express.Router();

// Define a test route
router.get("/test", (req, res) => {
  res.json({ message: "This is a test route!" });
});

module.exports = router;
