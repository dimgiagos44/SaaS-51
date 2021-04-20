const mysql = require('mysql2');        //mysql2 is updated and can play with security protocols
const dotenv = require('dotenv');       //read some env variables from .env file
dotenv.config();

const connection  = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME
});

connection.connect((err) => {
    if(err){
        console.log('Ask_me_anything_db not connected');
        throw err;
    }
    console.log('Ask_me_anything_db connected..');
});

module.exports.connection = connection;