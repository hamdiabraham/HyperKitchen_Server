const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");

const { errorHandler, notFound } = require("./middlewares/errorHandler");
const adminRoute = require("./routers/adminRoute");
const dashboardRouter = require("./routers/dashboardRoute");
const categoryRouter = require("./routers/categoryRoute");
const tagRouter = require("./routers/tagRoute");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  session({
    secret: "this may sound strength",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

app.use(
  "/adminlte",
  express.static(path.join(__dirname, "/node_modules/admin-lte/"))
);
app.use(methodOverride("_method"));

app.use(adminRoute);
app.use(dashboardRouter);
app.use(categoryRouter);
app.use(tagRouter);

app.use(errorHandler);
app.use(notFound);

module.exports = app;
