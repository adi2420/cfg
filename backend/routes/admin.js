const express = require('express');
const router = express.Router();
const User = require('../models/users');

//get

router.get('/login', (req, res) => {
  res.render('adminLogin');
});

router.get('/dashboard', (req, res) => {
  res.render('adminDashboard');
});

//post

router.post('/login', (req, res) => {
  // let { username, password } = req.body;
  let username = req.body.username;
  let password = req.body.password;
  console.log(username, password);
  if (username === 'admin@admin') {
    if (password === 'admin') {
      req.flash('success_msg', 'admin login successful');
      // res.send(`admin login successful ${username}`);
      res.render('adminDashboard');
    } else {
      req.flash('error_msg', 'passowrd incorrect');
      res.render('adminLogin', { username, password });
    }
  } else {
    req.flash('error_msg', 'username incorrect');
    res.render('adminLogin', { username, password });
  }
});

module.exports = router;
