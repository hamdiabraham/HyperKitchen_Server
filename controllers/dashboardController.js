const catchAsync = require("../utils/catchAsync");

exports.dashboard = catchAsync(async (req, res) => {
  res.render("index");
});
