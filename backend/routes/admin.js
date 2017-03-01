var express = require('express');
var router = express.Router();

/**
 * 导入具体的路由控制
 */
var admin = require('./controllers/admin_controller');


/**
 * 跳转到个人主页
 */
router.get('/admin_profile', admin.admin_profile);

/**
 * 个人中心-修改个人密码
 */
router.post('/admin_updatePassword', admin.admin_updatePassword);

//取消按钮
router.get('/admin_updatePassword', admin.admin_updatePassword);

/**
 * 跳转到登录页面
 */
router.get('/admin_toLogin', admin.admin_toLogin);
/**
 * 登录功能
 */
router.post('/admin_login', admin.admin_login);
/**
 * 注销功能
 */
router.get('/admin_logout', admin.admin_logout);






module.exports = router;
