const catchAsync = require("../utils/catchAsync");

exports.dashboard = catchAsync(async (req, res) => {
  res.render("index", { title: "Dashboar" });
});

exports.alerts = (req, res, next) => {
  const { alert } = req.query;

  if (alert === "booking")
    res.locals.alert = `Your booking was successful! Please check your emain for a confirmation. If your booking doesn't showp up immediatly, please come back later`;

  next();
};
