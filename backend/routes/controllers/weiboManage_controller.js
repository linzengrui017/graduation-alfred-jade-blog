/**
 * Created by lzr on 2017/2/21.
 */

/**
 * 跳转到微博管理主页
 */
exports.toWeiboManagePage = function (req, res) {
    res.render('backend/management/weibo_manage/weiboManage_index', { title: 'weibo_manage' });
};

/**
 * 查询微博
 */
exports.queryWeibo = function (req, res) {

};

/**
 * 查询非法微博
 */
exports.queryIllegalWeibo = function (req, res) {

};

/**
 * 删除非法微博
 */
exports.delIllegalWeibo = function (req, res) {

};