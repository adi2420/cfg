const express = require("express");
const app = express();
const mongodb = require("mongodb");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");
const bcrypt = require("bcrypt");

app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// const pathView = path.join(__dirname, '../frontend/');
// console.log(pathView);
app.set("views", path.join(__dirname, "../frontend/templates"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/cfg", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected db successfully");
  }
});

//Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// const ObjectId=require("mongoose").Types.ObjectId;

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/admin", require("./routes/admin"));

app.listen(5000, () => {
  console.log("server started on port 5000");
});
