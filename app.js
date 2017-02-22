var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

/**
 * 声明命名空间
 */
var weibo = require('./routes/weibo');
/**
 *
 */

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

/**
 * 使用指定的命名空间
 */
app.use('/weibo', weibo);
/**
 *
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * 路由规划
 *
 *
 * var index = require('./routes/index');
 * var users = require('./routes/users');
 *
 * app.use('/', index);
 * app.use('/users', users);
 * 默认已经有两个路由：/ 和 /user
 */

/**
 * user
 * 用户操作
 * app.use('/users', users);
 */


/**
 * weibo
 * 微博操作
 * app.use('/weibo', weibo);
 */

/**
 *
 */

module.exports = app;