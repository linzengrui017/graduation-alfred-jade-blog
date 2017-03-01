/**
 * Created by lzr on 2017/2/21.
 */

/**
 * 跳转到用户管理主页
 */
exports.toUsersManagePage = function (req, res) {
    res.render('backend/management/users_manage/usersManage_index', { title: 'usersManage' });
};




