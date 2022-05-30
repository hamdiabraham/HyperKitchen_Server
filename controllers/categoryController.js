const Category = require("../models/categoryModel");

exports.category = async (req, res) => {
  try {
    const category = await Category.find();
    res.render("category/view_category", {
      category,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addCategory = async (req, res) => {
  try {
    res.render("category/create_category");
  } catch (err) {
    console.log(err);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.redirect("/category");
  } catch (err) {
    console.log(err);
  }
};

exports.editCategory = async (req, res) => {
  try {
    // const category = Category.findById(req.params.id);
    const { id } = req.params;

    const category = await Category.findOne({ _id: id });

    res.render("category/edit", {
      category,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.editPostCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await Category.findOneAndUpdate({ _id: id }, { name });

    res.redirect("/category");
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.findOneAndRemove({ _id: id });

    res.redirect("/category");
  } catch (err) {
    console.log(err);
  }
};
