const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUserRole,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

// Protect all user routes with admin-only access
router.get("/", authMiddleware, requireRole("admin"), getUsers);
router.patch("/:id/role", authMiddleware, requireRole("admin"), updateUserRole);

module.exports = router;
