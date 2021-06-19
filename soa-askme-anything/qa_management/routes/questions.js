const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const http = require('http');
const axios = require('axios');
const JWT_SECRET= 'top-secret';


/*function verifyToken (req, res, next) {
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

router.get('/token', verifyToken, function (req, res, next){
    return res.status(200).send("All good.");

})*/

//get all questions
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
router.post('/', function(req, res, next) {
    let token = req.headers["authorization"].split(" ")[1]
    let question = JSON.stringify(req.body);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    }
    axios.post('http://localhost:3001/question',  question , { headers: headers })
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            res.send(response.data);
        })
        .catch(error => {
            res.send(error.message);
        })
})





module.exports = router;