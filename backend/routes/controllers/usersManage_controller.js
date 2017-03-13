/**
 * Created by lzr on 2017/2/21.
 */

var modelUser = require('../../../models/user');

/**
 * 跳转到用户管理主页
 */
exports.toUsersManagePage = function (req, res) {
    res.render('backend/management/users_manage/usersManage_index', { title: 'usersManage' });
};

/**
 * 查询用户
 */
exports.queryUsers = function (req, res) {
    /**
     * 查询数据库
     */
    modelUser.find({delTag:false}, function (err, data) {
        if(err){
            console.log("查询用户失败:"+err);
            res.redirect("/backend_dashboard");
        }

        /**
         * 返回数据
         */
        res.json({data: data});
        return data;

    }).sort({createTime: -1});
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