const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const http = require('http');
const axios = require('axios');
const { EventEmitter } = require('stream');
const JWT_SECRET= 'top-secret';

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
  let myAdress = 'http://localhost:4000/question/bus';
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
    if (event.event.url === 'createQuestion'){
        //let token = req.headers["authorization"].split(" ")[1];
        let token = event.event.token;
        let url = "token";
        let body1 = JSON.stringify({"url": url, "token": token});
        const headers = {'Content-Type': 'application/json',};
        axios.post('http://localhost:4200/bus', body1, {headers: headers})
        .then(response => {
            if(response.data.status === 'token validated'){
                console.log('i am validated')
                let question = JSON.stringify({
                    "text": event.event.text,
                    "title": event.event.title,
                    "user": event.event.user,
                    "keywords": event.event.keywords
                });
                axios.post('http://localhost:3001/question',  question , { headers: headers })
                .then(response => {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(response.data);
                })
                .catch(error => {
                    res.send(error.message);
                })
            }
            else{
                res.send({"status": "Question not created"});
            }
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.send({"status": "user not validated"});
        })
    }

    if (event.event.url === 'readAllQuestions'){
        axios.get('http://localhost:3001/question')
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            res.send(response.data);
        })
        .catch(error => {
            res.send(error.message);
        });
    }

    if (event.event.url === 'readQuestionById'){
        let questionId = event.event.questionId;
        axios.get('http://localhost:3001/question/' + questionId)
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            res.send(response.data);
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.message);
        });
    }

    if (event.event.url === 'readQuestionsByUserId'){
        let userId = event.event.userId;
        axios.get('http://localhost:3001/question')
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            let questions = response.data;
            //console.log(questions);
            let questionsByUserId = [];
            questions.forEach(question => {
                //console.log(question);
                if (question.user.id == userId){
                    questionsByUserId.push(question);

                }
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(questionsByUserId);
        })
        .catch(error => {
            res.send(error.message);
        })
    }

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

    if (event.event.url === 'whoami'){
        let token = event.event.token;
        let userId = event.event.userId;
        let body1 = JSON.stringify({"url": "token", "token": token});
        const headers = {'Content-Type': 'application/json'};
        axios.post('http://localhost:4200/bus', body1, {headers: headers})
        .then(response => {
            if(response.data.status === 'token validated'){
                axios.get(`http://localhost:3001/user/${userId}` , { headers: headers })
                .then(response => {
                    let userInfo = response.data;
                    let resultUserInfo = {
                        "id": userInfo.id,
                        "username": userInfo.username,
                        "email": userInfo.email,
                        "firstname": userInfo.firstname,
                        "lastname": userInfo.lastname
                    };
                    res.setHeader('Content-Type', 'application/json');
                    res.send(resultUserInfo);
                })
                .catch(error => {
                    res.send(error.message);
                })
            }
            else{
                res.send({"status": "User not validated"});
            }
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.send({"status": "user not validated"});
        })
    }
    
})


function verifyToken (req, res, next) {
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


/* //get all questions
router.get('/', function(req, res, next) {
    axios.get('http://localhost:3001/question')
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            res.send(response.data);
        })
        .catch(error => {
            res.send(error.message);
        });
});

//get single question by Id
router.get('/:questionId', function(req, res, next) {
    axios.get('http://localhost:3001/question/' + req.params.questionId)
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            res.send(response.data);
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.message);
        });
});

//get questions made by userId
router.get('/user/:userId', function (req, res, next) {
    axios.get('http://localhost:3001/question')
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            let questions = response.data;
            //console.log(questions);
            let questionsByUserId = [];
            questions.forEach(question => {
                //console.log(question);
                if (question.user.id == req.params.userId){
                    questionsByUserId.push(question);

                }
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(questionsByUserId);
        })
        .catch(error => {
            res.send(error.message);
        })
});

//create Question
router.post('/', verifyToken, function(req, res, next) {
    let token = req.headers["authorization"].split(" ")[1];
    let question = JSON.stringify(req.body);
    const headers = {
        'Content-Type': 'application/json',
    }
    axios.post('http://localhost:3001/question',  question , { headers: headers })
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            res.send(response.data);
        })
        .catch(error => {
            res.send(error.message);
        })
}) */





module.exports = router;