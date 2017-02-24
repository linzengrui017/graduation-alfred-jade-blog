/**
 * Created by lzr on 2017/2/21.
 */



/**
 * 跳转到写微博页面
 */
exports.toAddPage = function (req, res) {
    res.render('weibo/write', { title: 'Write' });
};

/**
 * 写微博
 */
exports.add = function (req, res) {

};

/**
 * 跳转到微博列表页面
 */
exports.toBlogListPage = function (req, res) {

};

/**
 * 显示微博列表
 */
exports.showBlogList = function (req, res) {

};

/**
 * 跳转到微博详情页面
 */
exports.toDetailBlogPage = function (req, res) {

};

/**
 * 显示微博详情
 */
exports.showDetailBlog = function (req, res) {

};

/**
 * 跳转到评论微博页面
 */
exports.toCommentBlogPage = function (req, res) {
    res.render('weibo/comment', { title: 'Write' });
};

/**
 * 评论微博
 */
exports.commentBlog = function (req, res) {

};

/**
 * 删除单条评论
 */
exports.delComment = function (req, res) {

};

/**
 * 删除单条微博
 */
exports.delBlog = function (req, res) {

};

/**
 * 跳转到转发微博页面
 */
exports.toForwardBlogPage = function (req, res) {

};

/**
 * 转发微博
 */
exports.forwardBlog = function (req, res) {

};