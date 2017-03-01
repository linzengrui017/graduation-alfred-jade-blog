/**
 * Created by lzr on 2017/2/21.
 */



/**
 * 跳转到管理员的个人主页
 */
exports.admin_profile = function (req, res) {
    res.render('backend/admin/profile', { title: 'admin_profile' });
};

/**
 * 个人中心-修改个人密码
 */
exports.admin_updatePassword = function (req, res) {
    /**
     * 修改密码的逻辑操作
     */



    /**
     * 跳页面
     */
    res.render('backend/index/backend_index', { title: 'backend' });
};

/**
 * 跳转到登录页面
 */
exports.admin_toLogin = function (req, res, next) {
    res.render('backend/admin/login', { title: 'admin_login' });
};

/**
 * 登录功能
 */
exports.admin_login = function (req, res) {
    /**
     * 登录功能的逻辑操作
     */



    /**
     * 跳页面
     */
    res.render('backend/index/backend_index', { title: 'backend' });
};

/**
 * 注销功能
 */
exports.admin_logout = function (req, res) {
    res.render('backend/admin/login', { title: 'backend' });
};

