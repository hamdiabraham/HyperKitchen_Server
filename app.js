const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();

const { errorHandler, notFound } = require("./middlewares/errorHandler");
const userRouter = require("./routers/userRoute");
const dashboardRouter = require("./routers/dashboardRoute");
const categoryRouter = require("./routers/categoryRoute");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/adminlte",
  express.static(path.join(__dirname, "/node_modules/admin-lte/"))
);
app.use(methodOverride("_method"));

app.use("/api/v1/users", userRouter);
app.use(dashboardRouter);
app.use(categoryRouter);

app.use(errorHandler);
app.use(notFound);

module.exports = app;
