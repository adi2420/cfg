const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Company = require("../models/companyPost");

//get

router.get("/login", (req, res) => {
  res.render("adminLogin");
});

router.get("/dashboard", (req, res) => {
  res.render("adminDashboard");
});

// usersInfo
router.get("./usersInfo", (req, res) => {
  User.find({}, (err, users) => {
    res.render("allUsers", {
      students: users,
    });
  });
});

//post
router.post("/login", (req, res) => {
  // let { username, password } = req.body;
  let username = req.body.username;
  let password = req.body.password;
  console.log(username, password);
  if (username === "admin@admin") {
    if (password === "admin") {
      req.flash("success_msg", "admin login successful");
      // res.send(`admin login successful ${username}`);
      res.render("adminDashboard");
    } else {
      req.flash("error_msg", "passowrd incorrect");
      res.render("adminLogin", { username, password });
    }
  } else {
    req.flash("error_msg", "username incorrect");
    res.render("adminLogin", { username, password });
  }
});

// view all companies onto AllCompany webPage
router.get("/viewAllCompanies", (resq, res) => {
  Company.find({}, (err, compAll) => {
    res.render("AllCompanies", {
      companies: compAll,
    });
  });
});

//get student details selected for particular company
router.get("/student/:id", (req, res) => {
  User.findById({ _id: req.params.id }, (err, user) => {
    res.render("studentProfile", {
      student: user,
    });
  });
});

module.exports = router;

// -----Templates file name
// allUsers
// AllCompanies
// adminDashboard
// studentProfile
// adminLogin
