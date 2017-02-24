var express = require('express');
var router = express.Router();

/**
 * 导入具体的路由控制
 */
var user = require('./controllers/user_controller');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/**
 * 跳转到用户的个人主页
 */
router.get('/u/:user', user.user);
/**
 * 跳转到注册页面
 * 暂时不用
 */
router.get('/toReg', user.toReg);
/**
 * 注册功能
 */
router.post('/reg', user.reg);
/**
 * 跳转到登录页面
 */
router.get('/toLogin', user.toLogin);
/**
 * 登录功能
 */
router.post('/login', user.login);
/**
 * 注销功能
 */
router.get('/logout', user.logout);
/**
 * 加关注功能
 */
router.post('/follow', user.follow);
/**
 * 解除关注功能
 */
router.post('/unfollow', user.unfollow);





module.exports = router;
