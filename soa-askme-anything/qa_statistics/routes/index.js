const express = require('express');
const router = express.Router();
const axios = require('axios');

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
  let myAdress = 'http://localhost:4002/bus';
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
  //console.log(event);
  //res.send({"status": "went ok"});
  if (event.event.url === 'getAllKeywords'){
    axios.get('http://localhost:3001/keyword')
        .then(response => {
          res.setHeader('Content-Type', 'application/json');
          res.send(response.data);
        })
        .catch(error => {
          res.send(error.message);
        });
  }
  if(event.event.url === 'getKeywordById') {
    axios.get('http://localhost:3001/keyword/id/' + event.event.keywordId)
      .then(response => {
        res.setHeader('Content-Type', 'application/json');
        res.send(response.data);
      })
      .catch(error => {
        res.setHeader('Content-Type', 'application/json');
        res.send(error.message);
      })
  }
  if(event.event.url === 'getQuestionsAfterChosenDay'){
    axios.get('http://localhost:3001/question')
      .then(response => {
        let questions = response.data;
        const chosenDay = new Date(event.event.chosenDay);
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
  }
  if(event.event.url === 'getQuestionsBeforeChosenDay'){
    axios.get('http://localhost:3001/question')
        .then(response => {
            let questions = response.data;
            const chosenDay = new Date(event.event.chosenDay);
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
  }
  if(event.event.url === 'getQuestionsCurrentChosenDay'){
    axios.get('http://localhost:3001/question')
        .then(response => {
            let questions = response.data;
            const chosenDay = new Date(event.event.chosenDay);
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
  }

  if(event.event.url === 'readQuestionsByUserIdToday'){
    axios.get('http://localhost:3001/question')
        .then(response => {
            let questions = response.data;
            const chosenDay = new Date(event.event.chosenDay);
            let userId = event.event.userId;
            let questionsOfChosenDay = [];
            questions.forEach(question => {
                let creationDate = question.createdAt;

                const questionDay = new Date(creationDate.split('T')[0]);
                if (+questionDay === +chosenDay && userId === question.user.id){
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
  }
})
 
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
