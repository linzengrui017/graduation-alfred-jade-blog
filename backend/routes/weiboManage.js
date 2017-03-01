var express = require('express');
var router = express.Router();

/**
 * 导入具体的路由控制
 */
var weiboManage = require('./controllers/weiboManage_controller');

/**
 * 跳转到微博管理主页
 */
router.get('/toWeiboManagePage', weiboManage.toWeiboManagePage);









module.exports = router;
