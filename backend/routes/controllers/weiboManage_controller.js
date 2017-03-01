/**
 * Created by lzr on 2017/2/21.
 */

/**
 * 跳转到微博管理主页
 */
exports.toWeiboManagePage = function (req, res) {
    res.render('backend/management/weibo_manage/weiboManage_index', { title: 'weibo_manage' });
};




