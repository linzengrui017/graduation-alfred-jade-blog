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

/**
 * 查询微博
 */
router.get('/queryWeibo', weiboManage.queryWeibo);

/**
 * 查询非法微博
 */
router.get('/queryIllegalWeibo', weiboManage.queryIllegalWeibo);

/**
 * 删除非法微博
 */
router.get('/delIllegalWeibo', weiboManage.delIllegalWeibo);








module.exports = router;
