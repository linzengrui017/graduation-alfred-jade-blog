var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/**
 * 导入具体的路由控制
 */
var weibo = require('./controllers/weibo_controller');

/**
 * 跳转到写微博页面
 */
router.get('/toAddPage', weibo.toAddPage);

/**
 * 写微博
 */
router.post('/add', weibo.add);

/**
 * 跳转到微博列表页面
 */
router.get('/toBlogListPage', weibo.toBlogListPage);

/**
 * 显示微博列表
 */
router.post('/showBlogList', weibo.showBlogList);

/**
 * 跳转到微博详情页面
 */
router.get('/toDetailBlogPage', weibo.toDetailBlogPage);

/**
 * 显示微博详情
 */
router.get('/showDetailBlog', weibo.showDetailBlog);

/**
 * 跳转到评论微博页面
 */
router.get('/toCommentBlogPage', weibo.toCommentBlogPage);

/**
 * 评论微博
 */
router.get('/commentBlog', weibo.commentBlog);

/**
 * 删除单条评论
 */
router.get('/delComment', weibo.delComment);

/**
 * 删除单条微博
 */
router.get('/delBlog', weibo.delBlog);

/**
 * 跳转到转发微博页面
 */
router.get('/toForwardBlogPage', weibo.toForwardBlogPage);

/**
 * 转发微博
 */
router.get('/forwardBlog', weibo.forwardBlog);


module.exports = router;
