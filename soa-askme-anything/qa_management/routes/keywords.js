const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const http = require('http');
const axios = require('axios');
const JWT_SECRET= 'top-secret';


//get all keywords
router.get('/', function(req, res, next) {
    axios.get('http://localhost:3001/keyword')
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            res.send(response.data);
        })
        .catch(error => {
            res.send(error.message);
        });
});


module.exports = router;