const Tag = require("../models/tagModel");
const catchAsync = require("../utils/catchAsync");

exports.getTag = catchAsync(async (req, res) => {
  const tag = await Tag.find();
  res.render("tag/view_tag", {
    tag,
    title: "Tag",
  });
});

exports.addTag = catchAsync(async (req, res) => {
  res.render("tag/create_tag", { title: "Add Tag" });
});

exports.createTag = catchAsync(async (req, res) => {
  const tag = await Tag.create(req.body);
  res.redirect("/tag");
});

exports.editTag = catchAsync(async (req, res) => {
  // const category = Category.findById(req.params.id);
  const { id } = req.params;

  const tag = await Tag.findOne({ _id: id });

  res.render("tag/edit", {
    tag,
    title: "Edit Tag",
  });
});

exports.editPostTag = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await Tag.findOneAndUpdate({ _id: id }, { name });

  res.redirect("/tag");
});

exports.deleteTag = catchAsync(async (req, res) => {
  const { id } = req.params;

  await Tag.findOneAndRemove({ _id: id });

  res.redirect("/tag");
});
