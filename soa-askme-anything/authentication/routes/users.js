const express = require('express')
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
require('dotenv').config();

//login strategy
passport.use('login', new LocalStrategy(function(username, password, done) {
    axios.get('http://localhost:3001/user/username/' + username)
        .then(response => {
            //console.log(response.data);
            //console.log(password);
            bcrypt.compare(password, response.data.password, function(err, matches) {
                if(matches){
                    console.log('match');
                    return done(null, {username: username, userId: response.data.id});
                }
                else{
                    console.log('not match');
                    return done(null, false);
                }
            });
        })
        .catch(error => {
            //console.log(error);
            return done(null, false);
        })
}));

//login POST
router.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
        if (err) { return res.sendStatus(404); }
        if (!user) { return res.json({ message: "Unauthorized" }) }
        res.json({
            token: jwt.sign({username: user.username, id: user.id}, process.env.JWT_SECRET, { expiresIn: 3600 }),
            userId: user.userId
        });
    })(req, res, next);
});

//signup POST
router.post('/signup', function(req, res, next) {
    axios.get('http://localhost:3001/user/username/' + req.body.username)
        .then(response => {
            console.log('response.data = ' + response.data);
            res.json({ message: "User with this username exists" });
        })
        .catch(error => {
            const user = req.body;
            const headers = {'Content-Type': 'application/json'};
            axios.post('http://localhost:3001/auth/signup', user, { headers: headers })
                .then(resp => {
                    res.json({ message: "User created successfully" });
                })
                .catch(err => {
                    res.json({ message: "Request failed"});
                })
        });
});

module.exports = router;