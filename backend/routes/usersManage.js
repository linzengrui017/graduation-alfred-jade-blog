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









module.exports = router;
