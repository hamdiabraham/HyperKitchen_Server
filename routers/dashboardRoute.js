const dashboardRoute = require("express").Router();
const dashboardController = require("../controllers/dashboardController");

dashboardRoute.get("/", dashboardController.dashboard);

module.exports = dashboardRoute;
