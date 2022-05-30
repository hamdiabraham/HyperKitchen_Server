const categoryRoute = require("express").Router();
const categoryController = require("../controllers/categoryController");

categoryRoute.get("/category", categoryController.category);
categoryRoute.get("/category/create", categoryController.addCategory);
categoryRoute.post("/category/create", categoryController.createCategory);
categoryRoute.get("/category/edit/:id", categoryController.editCategory);
categoryRoute.put("/category/edit/:id", categoryController.editPostCategory);
categoryRoute.delete("/category/delete/:id", categoryController.deleteCategory);

module.exports = categoryRoute;
