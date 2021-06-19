const express = require('express')
const router = express.Router();
const http = require('http');
const axios = require('axios');

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
router.post('/', function(req, res, next) {
    let token = req.headers["authorization"].split(" ")[1]
    let answer = JSON.stringify(req.body);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    }
    axios.post('http://localhost:3001/answer',  answer , {headers: headers})
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            res.send(response.data);
        })
        .catch(error => {
            res.send(error.message);
        })
})

module.exports = router;