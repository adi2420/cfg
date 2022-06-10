const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

//Post

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;

  let errors = [];
  //Check errorss(required fields)
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill all the required fields...' });
  }
  //check password match
  if (password !== password2) {
    errors.push({ msg: "Passwords doesn't match!!" });
  }
  //check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password length should be minimum of 6 charaters..' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //Validation of New user email
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email alreadt exists!!' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

module.exports = router;
