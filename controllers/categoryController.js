const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");

exports.getCategory = catchAsync(async (req, res) => {
  const category = await Category.find();
  res.render("category/view_category", {
    category,
    title: "Category",
  });
});

exports.addCategory = catchAsync(async (req, res) => {
  res.render("category/create_category", { title: "Add Category" });
});

exports.createCategory = catchAsync(async (req, res) => {
  const category = await Category.create(req.body);
  res.redirect("/category");
});

exports.editCategory = catchAsync(async (req, res) => {
  // const category = Category.findById(req.params.id);
  const { id } = req.params;

  const category = await Category.findOne({ _id: id });

  res.render("category/edit", {
    category,
    title: "Edit Category",
  });
});

exports.editPostCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await Category.findOneAndUpdate({ _id: id }, { name });

  res.redirect("/category");
});

exports.deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;

  await Category.findOneAndRemove({ _id: id });

  res.redirect("/category");
});
