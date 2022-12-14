"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireSignIn = exports.requireAuth = exports.facebookSignUp2 = exports.facebookSignUp = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = _interopRequireDefault(require("passport-jwt"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _user = _interopRequireDefault(require("../models/user.model/user.model"));

require("dotenv/config");

// import config from '../config';
var FacebookStrategy = require('passport-facebook').Strategy;

var JwtStrategy = _passportJwt["default"].Strategy;
var LocalStrategy = _passportLocal["default"].Strategy;
var ExtractJwt = _passportJwt["default"].ExtractJwt; // const { jwtSecret } = config;

_passport["default"].use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, function (payload, done) {
  _user["default"].findOne({
    _id: payload.sub,
    deleted: false,
    activated: true
  }).then(function (user) {
    //console.log(user)
    if (!user) return done(null, false);
    return done(null, user);
  })["catch"](function (err) {
    console.log('Passport Error: ', err);
    return done(null, false);
  });
}));

_passport["default"].use(new LocalStrategy({
  usernameField: 'email'
}, function (email, password, done) {
  _user["default"].findOne({
    email: email,
    deleted: false
  }).then(function (user) {
    if (!user) return done(null, false); // Compare Passwords

    user.isValidPassword(password, function (err, isMatch) {
      if (err) return done(err);
      if (!isMatch) return done(null, false, {
        error: 'Invalid Credentials'
      });
      return done(null, user);
    });
  });
}));

_passport["default"].use(new FacebookStrategy({
  clientID: '2030001723966035',
  //FACEBOOK_APP_ID,
  clientSecret: '46ce3cad21a27bf4be3b95c4c85aedab',
  //FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  // when the auth is ok route to this
  profileFields: ['id', 'picture', 'email', 'firstname', 'lastname']
}, function (accessToken, refreshToken, profile, cb) {
  var user = {
    email: profile.email,
    picture: profile.picture,
    firstname: profile.firstname,
    lastname: profile.lastname
  };
  return cb(err, user);
}));

var requireAuth = _passport["default"].authenticate('jwt', {
  session: false
});

exports.requireAuth = requireAuth;

var requireSignIn = _passport["default"].authenticate('local', {
  session: false
});

exports.requireSignIn = requireSignIn;

var facebookSignUp = _passport["default"].authenticate('facebook');

exports.facebookSignUp = facebookSignUp;

var facebookSignUp2 = _passport["default"].authenticate('facebook', {
  failureRedirect: '/facebookerror'
});

exports.facebookSignUp2 = facebookSignUp2;