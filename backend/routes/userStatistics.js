var express = require('express');
var router = express.Router();

/**
 * 导入具体的路由控制
 */
var usersManage = require('./controllers/userStatistics_controller');

/**
 * 跳转到用户统计主页
 */
router.get('/toUsersStatisticsPage', usersManage.toUsersStatisticsPage);

/**
 * 查询网站访问量
 */
router.post('/queryUserTraffic', usersManage.queryUserTraffic);


module.exports = router;
