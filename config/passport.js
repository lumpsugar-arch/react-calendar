const LocalStrategy = require('passport-local').Strategy,
      mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      PassportJwt = require('passport-jwt'),
      JwtStrategy = PassportJwt.Strategy,
      ExtractJwt = PassportJwt.ExtractJwt;

const User = require('../models/User');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
};

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, (email, password, done) => {
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'This email is not registered' });
        }

        bcrypt.compare(password.trim(), user.password.trim(), (err, isMatch) => {
          if (err) throw err;
          if (isMatch) return done(null, user);
          return done(null, false, { message: 'Password incorrect' });
        });
      });
    })
  );

  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findOne({ _id: payload._id }).then(user => {
        if (!user) return done(null, false);
        return done(null, user);
      });
    })
  )
};
