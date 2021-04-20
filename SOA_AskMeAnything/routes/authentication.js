const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
dotenv.config();
const JWT_SECRET = process.env.SECRET_KEY;



// sign in - strategy
passport.use('signin', new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username, password: password }, function(err, user){
            if (err){
                return done(err);
            }
            if (!user){
                return done(null, false);
            }
            //if (user.password != password){
            //return done(null, false);
            //}
            if (!bcrypt.compare(password, user.password)) {
                return done(null, false);
            }
            return done(null, { username: user.username});
        });
    }))


//POST signin
router.post('/signin',
    passport.authenticate('signin', { session: false }),
    function(req, res, next) {
        res.json({
            token: jwt.sign(req.user, JWT_SECRET, { expiresIn: 3600 })
        });
    });

//POST sign up
router.post('/signup', (req, res, next) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    User.create(newUser);
    res.json({user: newUser});
})


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


//simple restricted-whoami
router.get('/whoami',
    passport.authenticate('token', { session: false }),
    function(req, res, next){
        res.json( { user: req.user} );
    }
);

module.exports = router;