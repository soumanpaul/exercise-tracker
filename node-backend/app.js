var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const exercisesRouter = require("./routes/exercises");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());

// Database connection
//const uri = process.env.ATLAS_URI;
let ATLAS_URI =
  "mongodb+srv://Sam1729Paul:Sam1729Paul@cluster0-qhlvw.mongodb.net/test?retryWrites=true&w=majority";
const uri = ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// routers
app.use("/index", indexRouter);
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
