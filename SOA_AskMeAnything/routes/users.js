const express = require('express');
const router = express.Router();
const User = require('../model/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');       //read some env variables from .env file
dotenv.config();
const JWT_SECRET = process.env.SECRET_KEY;


//token - strategy
passport.use('token', new JWTstrategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    function (token, done){
      return done(null, { username: token.username })
    }
))

//simple restricted-getall GET
router.get('/all',
    passport.authenticate('token', { session: false }),
    function(req, res, next) {
      User.getAllUsers(result => {
        res.json( {users: result} );
      });
    });

//simple restricted-update user
router.post('/update/user',
    passport.authenticate('token', { session: false }),
    function(req, res, next) {
      const username = req.body.username;
      const updatedUser = new User({
        username: username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
      })
      console.log('not failed yet');
      User.updateByUsername(username, updatedUser, result => {
        res.json({result: result});
      })
    });

module.exports = router;
