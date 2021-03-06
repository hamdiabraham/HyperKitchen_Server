const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.loginPage);
router.post("/login", authController.loginAdmin);
router.post("/signup", authController.signup);
router.get("/logout", authController.logutAdmin);

module.exports = router;
