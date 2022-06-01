const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware.protectAdmin,
  dashboardController.dashboard
);

module.exports = router;
