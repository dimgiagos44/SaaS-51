const express = require('express')
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET= 'top-secret';
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
require('dotenv').config();

const REDIS_PORT = 6379;
const REDIS_HOST = 'localhost';
const TotalConnections = 20;

const pool = require('redis-connection-pool')('myRedisPool', {
  host: REDIS_HOST,
  port: REDIS_PORT,
  max_clients: TotalConnections,
  perform_checks: false,
  database: 0,
});
console.log('connected to redis');

//check if subscribed or add me to subscribers list
pool.hget('subscribers', 'channel', async(err, data) => {
    let currentSubscribers = JSON.parse(data);
    let alreadySubscribed = false;
    
    //myAdress is where the orchestrator should send the message so that i receive it
    let myAdress = 'http://localhost:4001/bus';
    for (let i=0; i<currentSubscribers.length; i++){
      if(currentSubscribers[i] == myAdress){
        alreadySubscribed = true;
      }
    }
  
    if(!alreadySubscribed){
      currentSubscribers.push(myAdress);
      pool.hset('subscribers', 'channel', JSON.stringify(currentSubscribers), ()=> {})
      console.log('subscribed');
    }
    else {
      console.log('alread subscribed');
    }
});

router.post('/bus', function(req, res, next) {
    const event = req.body;
    if (event.event.url === 'login'){
        req.body = {"username": event.event.username, "password": event.event.password};
        //console.log('req.body is ', req.body);
        passport.authenticate('login', function(err, user, info) {
            if (err) { return res.sendStatus(404); }
            if (!user) { return res.json({ message: "Unauthorized" }) }
            res.json({
                token: jwt.sign({username: user.username, id: user.id}, process.env.JWT_SECRET, { expiresIn: 360000 }),
                userId: user.userId
            });
        })(req, res, next);
    }
    if (event.event.url === 'signup'){
        req.body = {
            "username": event.event.username, 
            "password": event.event.password, 
            "email": event.event.email,
            "firstname": event.event.firstname,
            "lastname": event.event.lastname
        };

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
    }
    if (event.event.url === 'token'){
        req.body = {
            "token": event.event.token
        };
        let token = req.body.token;
        jwt.verify(token, JWT_SECRET, function (err, decoded) {
            if (err){
                res.send({ message: "Failed to validate token." });
            }
            else{
                res.send({"token": token, "status": "token validated"});
            }
        })
    }
  });
   
  router.get('/keyword', function(req, res, next) {
    axios.get('http://localhost:3001/keyword')
        .then(response => {
          res.setHeader('Content-Type', 'application/json');
          res.send(response.data);
        })
        .catch(error => {
          res.send(error.message);
        });
  });



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
            token: jwt.sign({username: user.username, id: user.id}, process.env.JWT_SECRET, { expiresIn: 360000 }),
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