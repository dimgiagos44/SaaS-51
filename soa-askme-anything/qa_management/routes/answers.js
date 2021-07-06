const express = require('express')
const router = express.Router();
const http = require('http');
const jwt = require('jsonwebtoken');
const JWT_SECRET= 'top-secret';
const axios = require('axios');

/* const REDIS_PORT = 6379;
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
  let myAdress = 'http://localhost:4000/answer/bus';
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
 

router.post('/bus', (req, res) => {
    const event = req.body;
    if (event.event.url === 'createAnswer'){
        //let token = req.headers["authorization"].split(" ")[1];
        let token = event.event.token;
        let url = "token";
        let body1 = JSON.stringify({"url": url, "token": token});
        const headers = {'Content-Type': 'application/json',}
        axios.post('http://localhost:4200/bus', body1, {headers: headers})
        .then(response => {
            if(response.data.status === 'token validated'){
                console.log('i am validated')
                let question = JSON.stringify({
                    "text": event.event.text,
                    "user": event.event.user,
                    "question": event.event.question
                });
                axios.post('http://localhost:3001/answer',  question , { headers: headers })
                .then(response => {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(response.data);
                })
                .catch(error => {
                    res.send(error.message);
                })
            }
            else{
                res.send({"status": "Answer not created"});
            }
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.send({"status": "user not validated"});
        })
    }

    if (event.event.url === 'readAnswerById'){
        let answerId = event.event.answerId;
        axios.get('http://localhost:3001/answer/' + answerId)
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            res.send(response.data);
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.message);
        });
    }

    if (event.event.url === 'readAnswersByUserId'){
        let userId = event.event.userId;
        axios.get('http://localhost:3001/answer')
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            let answers = response.data;
            let answersByUserId = [];
            answers.forEach(answer => {
                if (answer.user.id == userId){
                    answersByUserId.push(answer);
                }
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(answersByUserId);
        })
        .catch(error => {
            res.send(error.message);
        })
    }
    
}) /*

/* function verifyToken (req, res, next) {
    let token = req.headers["authorization"].split(" ")[1];
    if (!token) {
        return res.status(403).send({ message: "No token received. "});
    }
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
        if (err){
            return res.status(500).send({ message: "Failed to authenticate token." });
        }
        next();
    })
};

//get single answer by id
router.get('/:answerId', function(req, res, next) {
    axios.get('http://localhost:3001/answer/' + req.params.answerId)
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            res.send(response.data);
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.message);
        });
});

//get answers made by userId
router.get('/user/:userId', function (req, res, next) {
    axios.get('http://localhost:3001/answer')
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            let answers = response.data;
            let answersByUserId = [];
            answers.forEach(answer => {
                if (answer.user.id == req.params.userId){
                    answersByUserId.push(answer);
                }
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(answersByUserId);
        })
        .catch(error => {
            res.send(error.message);
        })
});

//create Answer
router.post('/', verifyToken, function(req, res, next) {
    let token = req.headers["authorization"].split(" ")[1]
    let answer = JSON.stringify(req.body);
    const headers = {
        'Content-Type': 'application/json',
    }
    axios.post('http://localhost:3001/answer',  answer , {headers: headers})
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            res.send(response.data);
        })
        .catch(error => {
            res.send(error.message);
        })
}) */

module.exports = router;