const express = require("express");
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware.protectAdmin);

router.get("/category", categoryController.getCategory);
router.get("/category/create", categoryController.addCategory);
router.post("/category/create", categoryController.createCategory);
router.get("/category/edit/:id", categoryController.editCategory);
router.put("/category/edit/:id", categoryController.editPostCategory);
router.delete("/category/delete/:id", categoryController.deleteCategory);

module.exports = router;
