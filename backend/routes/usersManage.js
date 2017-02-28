var express = require('express');
var router = express.Router();

/**
 * 导入具体的路由控制
 */
var usersManage = require('./controllers/usersManage_controller');

/**
 * 跳转到用户管理主页
 */
router.get('/toUsersManagePage', usersManage.toUsersManagePage);


// /**
//  * 跳转到个人主页
//  */
// router.get('/u/:admin', admin.admin_profile);
//
// /**
//  * 跳转到登录页面
//  */
// router.get('/admin_toLogin', admin.admin_toLogin);
// /**
//  * 登录功能
//  */
// router.post('/admin_login', admin.admin_login);
// /**
//  * 注销功能
//  */
// router.get('/admin_logout', admin.admin_logout);






module.exports = router;
