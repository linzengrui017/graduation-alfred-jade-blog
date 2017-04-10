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
router.post('/queryWeibo', weiboManage.queryWeibo);

/**
 * 查询非法微博
 */
router.get('/queryIllegalWeibo', weiboManage.queryIllegalWeibo);

/**
 * 删除非法微博
 */
router.get('/delIllegalWeibo', weiboManage.delIllegalWeibo);

/**
 * 跳转到 转发微博 页面
 */
router.get('/toRelayBlogManagePage', weiboManage.toRelayBlogManagePage);

/**
 * 显示 转发微博
 */
router.post('/showRelayBlogList', weiboManage.showRelayBlogList);

/**
 * 按条件查询 同一条被转发的微博
 */
router.post('/queryRelayBlog', weiboManage.queryRelayBlog);

/**
 * 查询 原微博 被转发数
 */
router.post('/showBlogRelayNumList', weiboManage.showBlogRelayNumList);



module.exports = router;
