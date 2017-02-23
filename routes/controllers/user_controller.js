/**
 * Created by lzr on 2017/2/21.
 */



/**
 * 跳转到用户的个人主页
 */
exports.user = function (req, res) {

};

/**
 * 跳转到注册页面
 */
exports.toReg = function (req, res) {
    res.render('user/register', { title: 'Reg' });
};

/**
 * 注册功能
 */
exports.reg = function (req, res) {

};

/**
 * 跳转到登录页面
 */
exports.toLogin = function (req, res, next) {
    res.render('user/login', { title: 'Login' });
};

/**
 * 登录功能
 */
exports.login = function (req, res) {

};

/**
 * 注销功能
 */
exports.logout = function (req, res) {

};

