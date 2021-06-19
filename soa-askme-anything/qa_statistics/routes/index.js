const express = require('express');
const router = express.Router();
const axios = require('axios');

//get all questions
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

//get keyword by id
router.get('/keyword/id/:keywordId', function (req, res, next){
  axios.get('http://localhost:3001/keyword/id/' + req.params.keywordId)
      .then(response => {
        res.setHeader('Content-Type', 'application/json');
        res.send(response.data);
      })
      .catch(error => {
        res.setHeader('Content-Type', 'application/json');
        res.send(error.message);
      })
})

//get questions of user after chosen day
router.get('/question/afterday/:chosenDay', function (req, res, next){
  axios.get('http://localhost:3001/question')
      .then(response => {
        let questions = response.data;
        const chosenDay = new Date(req.params.chosenDay);
        let questionsOfChosenDay = [];
        questions.forEach(question => {
          let creationDate = question.createdAt;
          const questionDay = new Date(creationDate.split('T')[0]);
          if (+questionDay >= +chosenDay){
            questionsOfChosenDay.push(question);
          }
        });
        res.setHeader('Content-Type', 'application/json');
        res.send(questionsOfChosenDay);
      })
      .catch(error => {
        res.setHeader('Content-Type', 'application/json');
        res.send(error.message);
      })
})

//get questions of user before chosen day
router.get('/question/beforeday/:chosenDay', function (req, res, next){
    axios.get('http://localhost:3001/question')
        .then(response => {
            let questions = response.data;
            const chosenDay = new Date(req.params.chosenDay);
            let questionsOfChosenDay = [];
            questions.forEach(question => {
                let creationDate = question.createdAt;
                const questionDay = new Date(creationDate.split('T')[0]);
                if (+questionDay <= +chosenDay){
                    questionsOfChosenDay.push(question);
                }
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(questionsOfChosenDay);
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.message);
        })
})

//get questions of user current chosen day
router.get('/question/currentday/:chosenDay', function (req, res, next){
    axios.get('http://localhost:3001/question')
        .then(response => {
            let questions = response.data;
            const chosenDay = new Date(req.params.chosenDay);
            let questionsOfChosenDay = [];
            questions.forEach(question => {
                let creationDate = question.createdAt;
                const questionDay = new Date(creationDate.split('T')[0]);
                if (+questionDay === +chosenDay){
                    questionsOfChosenDay.push(question);
                }
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(questionsOfChosenDay);
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.message);
        })
})


module.exports = router;
