require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const questionRouter = require('./routes/questions');
const answerRouter = require('./routes/answers');
const keywordRouter = require('./routes/keywords');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/question', questionRouter);
app.use('/answer', answerRouter);
app.use('/keyword', keywordRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//log errors
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  if (status >= 500 || req.app.get('env') === 'development'){
    console.log(err.stack);
  }
  next(err);
})

// error handler
app.use(function(err, req, res, next) {
  const status = err.status || 500;
  res.status(status);
  const message = status >= 500 ? "Something's wrong" : err.message;
  const expose = status >= 500 && req.app.get('env') === 'development';
  res.end(expose ? message + '\n\n' + err.stack : message);
});

module.exports = app;
