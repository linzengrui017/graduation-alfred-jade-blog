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
    modelUser.find({}, function (err, data) {
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
    /**
     * 获取数据
     */
    var id = req.query._id;
    /**
     * 校验
     */
    if( null == id || '' == id){
        console.log('必传参数不能为空');
        req.session.error = "必传参数不能为空";
    }else {
        /**
         * 准备数据
         */
        var query = {
            _id : id
        };
        var operator = {
            $set : { delTag : true }
        };
        /**
         * 修改数据库
         */
        modelUser.update(query, operator, function (err, data) {
            if(err){
                console.log('冻结用户操作失败：'+ err);
                return;
            }
            console.log('成功冻结用户,id:'+id);
            res.redirect('/toUsersManagePage');
            // res.end();
        });
    }
};


/**
 * 解封用户
 */
exports.unblockUser = function (req, res) {
    /**
     * 获取数据
     */
    var id = req.query._id;
    /**
     * 校验
     */
    if( null == id || '' == id){
        console.log('必传参数不能为空');
        req.session.error = "必传参数不能为空";
    }else {
        /**
         * 准备数据
         */
        var query = {
            _id : id
        };
        var operator = {
            $set : { delTag : false }
        };
        /**
         * 修改数据库
         */
        modelUser.update(query, operator, function (err, data) {
            if(err){
                console.log('解封用户操作失败：'+ err);
                return;
            }

            console.log('成功解封用户,id:'+id);
            res.end();

        });
    }
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