import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';
import path from 'path';

import indexRouter from './routes';
// import `red`is from './lib/redis'

// redis
// redis.set("string key", "string val");
// redis.hset("hash key", "hashtest 1", "some value");

// app
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
// app.use(express.static(path.join(__dirname,'../dist')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


console.log(`SERVER LISTEN AT ${process.env.PORT||"3000"}`)

export default app;
