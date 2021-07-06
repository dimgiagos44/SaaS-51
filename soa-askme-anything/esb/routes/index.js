const express = require('express');
const router = express.Router();
const axios = require('axios');
const redis = require('redis');
const bodyParser = require('body-parser');


//redis connection
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
//
pool.hset('subscribers', 'channel', JSON.stringify([]), () => {});
pool.hset('bus', 'messages', JSON.stringify([]), () => {});

//endpoints

//test endpoint
router.get('/hello', function(req, res, next) {
  res.send('hello from esb');
});

router.post('/bus', async(req, res) => {
  const event = req.body;
  let currentMessages;
  let newMessage = {};

  //get all message history from redis, clients can do the same
  pool.hget('bus', 'messages', async(err, data) => {
      currentMessages = JSON.parse(data);
      newMessage = {
        "id": currentMessages.length + 1,
        event,
        "timestamp": Date.now()
      }

      currentMessages.push(newMessage);

      pool.hset('bus', 'messages', JSON.stringify(currentMessages), ()=> {
        pool.hget('subscribers', 'channel', (err, data) => {
          let subscribers = JSON.parse(data);
          for(let i=0; i<subscribers.length; i++){
            axios.post(subscribers[i], newMessage).then(resp => {
              console.log(subscribers[i], resp["data"]);
              res.send(resp["data"]);
            }).catch(e => {
              console.log(subscribers[i], {"status": "connection lost"});
            });
          }
        });
      });
  });

  
});



module.exports = router;
