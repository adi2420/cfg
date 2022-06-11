const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");

//studnet---- register, login,

//Get
router.get("/login", (req, res) => {
  res.render("userLogin");
});

router.get("/dashboard", (req, res) => {
  res.render("userDashboard");
});

//from user dashboard=> resume creation
router.get("./resume", (req, res) => {
  res.render("resumeForm");
});

//Post

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  let errors = [];
  if (!email || !password) {
    errors.push({ msg: "Please fill all the required fields..." });
  }

  if (errors.length > 0) {
    res.render("userLogin", {
      errors,
      email,
      password,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        errors.push({ msg: "User doesn't exist!!" });
        res.render("userLogin", {
          errors,
          email,
          password,
        });
      } else {
        User.findOne({ email: email }).then((user) => {
          console.log(user);
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              errors.push({ msg: "Password doesn't match!!" });
              res.render("/users/login", {
                errors,
                email,
                password,
              });
            } else {
              req.flash("success_msg", "Logged in Successfully!!!");
              res.render("userDashboard");
            }
          });
        });
      }
    });
  }
});

//create resume
router.get("./resumeSubmit/:id", (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    let {
      name,
      email,
      technical,
      nonTechnical,
      semester,
      qualification,
      college,
    } = req.body;
    res.render("resume", {
      name,
      email,
      technical,
      nonTechnical,
      semester,
      qualification,
      college,
    });
  });
});


module.exports = router;
