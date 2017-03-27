var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/**
 * 导入模块
 */
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


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

/**
 * 使用mongoose连接数据库
 */
mongoose.connect('mongodb://localhost/weibo');

/**
 * 使用session
 */
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret:"45454",
    store: new MongoStore({
        cookieSecret: 'lzr',
        db: 'weibo',
        host: 'localhost',
        mongooseConnection: mongoose.connection
    })
}));

/**
 * 登录控制
 */

app.use(function(req, res, next) {
    res.locals.user = req.session.user || null;
    res.locals.adminer = req.session.adminer || null;
    next();
});

/**
 * 使用中间件来返回成功和失败信息
 */
app.use(function (req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;

    delete req.session.error;
    delete req.session.success;

    res.locals.message = '';

    if(err){
        res.locals.message = err;
    }

    if(msg){
        res.locals.message = msg;
    }

    next();

});

/**
 * 路由控制
 * 声明命名空间
 */
var index = require('./routes/index');
var users = require('./routes/users');

var weibo = require('./routes/weibo');
var admin = require('./backend/routes/admin');
var dashboard = require('./backend/routes/dashboard');
var usersManage = require('./backend/routes/usersManage');
var weiboManage = require('./backend/routes/weiboManage');
/**
 *
 */
app.use('/', index);
// app.use('/users', users);
/**
 * 路径应该是默认路径
 */
app.use('/', users);

/**
 * 使用指定的命名空间
 */
app.use('/', weibo);
app.use('/', admin);
app.use('/', dashboard);
app.use('/', usersManage);
app.use('/', weiboManage);

/**
 * express 4.x已经移除了config方法
 */





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


module.exports = app;
