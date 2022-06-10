const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

//Get
router.get('/login', (req, res) => {
  res.render('userLogin');
});

router.get('/dashboard', (req, res) => {
  res.render('userDashboard');
});

//Post

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  let errors = [];
  if (!email || !password) {
    errors.push({ msg: 'Please fill all the required fields...' });
  }

  if (errors.length > 0) {
    res.render('userLogin', {
      errors,
      email,
      password,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        errors.push({ msg: "User doesn't exist!!" });
        res.render('userLogin', {
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
              res.render('/users/login', {
                errors,
                email,
                password,
              });
            } else {
              req.flash('success_msg', 'Logged in Successfully!!!');
              res.render('userDashboard');
            }
          });
        });
      }
    });
  }
});

module.exports = router;
