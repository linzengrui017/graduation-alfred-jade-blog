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
 * 跳转到登录页面
 */
exports.admin_toLogin = function (req, res, next) {
    res.render('backend/admin/login', { title: 'admin_login' });
};

/**
 * 登录功能
 */
exports.admin_login = function (req, res) {

};

/**
 * 注销功能
 */
exports.admin_logout = function (req, res) {
    res.render('backend/index/backend_index', { title: 'backend' });
};

