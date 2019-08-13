const express = require('express'),
      User = require('../models/User'),
      bcrypt = require('bcrypt'),
      passport = require('passport'),
      passportJwt = require('passport-jwt'),
      jwt = require('jsonwebtoken');


const router = express.Router();

router.post('/register', (req, res) => {
  const userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };

  let errors = [];

  if (!userData.email || !userData.username || !userData.password) {
    errors.push({msg: 'Please fill in all fields'})
  }

  if (userData.password.length < 6) {
    errors.push({msg: 'Password should be at least 6 characters'})
  }

  User.findOne({ email: userData.email })
    .then(user => {
      if (user) errors.push({msg: 'User with this email is already registered'});

      if (errors.length > 0) {
        res.json(errors)
      } else {
        const user = new User(userData);

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save()
              .then(user => {
                res.status(201).json(user)
              })
              .catch(err => console.log(err))
          }));
      }
    });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.send(err);
    if (!user) return res.send(info);

    if (user) {
      req.login(user, { session: false }, (err) => {
        if (err) return res.send(err);

        const token = jwt.sign(user.toJSON(), 'secret');
        res.send({ token: token })
      })
    }
  })(req, res, next);
});

router.get('/getUser', (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) return res.send(err);
    if (!user) return res.send(info);

    if (user) return res.send(user)
  })(req, res, next);
});

module.exports = router;