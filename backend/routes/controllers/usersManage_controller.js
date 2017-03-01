/**
 * Created by lzr on 2017/2/21.
 */

/**
 * 跳转到用户管理主页
 */
exports.toUsersManagePage = function (req, res) {
    res.render('backend/management/users_manage/usersManage_index', { title: 'usersManage' });
};


/**
 * 跳转到用户个人信息详情
 */
exports.toUserDetailPage = function (req, res) {

};


/**
 * 显示用户个人信息详情
 */
exports.userDetail = function (req, res) {

};


/**
 * 冻结用户
 */
exports.inactivateUser = function (req, res) {

};


/**
 * 解封用户
 */
exports.unblockUser = function (req, res) {

};



/**
 * 显示冻结用户列表
 */
exports.toInactivateUserList = function (req, res) {

};


/**
 * 显示解封用户列表
 */
exports.toUnblockUserList = function (req, res) {

};