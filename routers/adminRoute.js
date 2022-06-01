const express = require("express");
const authController = require("../controllers/authController");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

router.use(dashboardController.alerts);

router.get("/", authController.loginPage);
router.post("/login", authController.loginAdmin);
router.post("/signup", authController.signup);
router.get("/logout", authController.logutAdmin);

module.exports = router;
