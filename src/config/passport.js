/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

require('dotenv').config();
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/entity/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload._id).then((user) => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      });
    }),
  );
};
