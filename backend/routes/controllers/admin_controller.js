/**
 * Created by lzr on 2017/2/21.
 */

var modelAdmin = require('../../../models/admin');

//使用md5加密
var crypto=require("crypto");

//获取当前系统时间
var sd = require('silly-datetime');

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
     * 服务器端校验
     */
    var username = req.body.username;
    var pwd = req.body.pwd;
    var pwd2 = req.body.pwd2;
    if( null == username || '' == username){
        console.log('用户名不能为空');
        req.session.error = "用户名不能为空";
        res.redirect('/admin_profile');
    } else if(pwd != pwd2){
        console.log('两次输入的密码不一致');
        req.session.error = "两次输入的密码不一致";
        res.redirect('/admin_profile');
    } else {
        /**
         * 校验成功
         * md5加密
         */
        var md5 = crypto.createHash("md5");
        var password = md5.update(pwd).digest("base64");
        /**
         * 数据库操作
         */
        var query = {
            username : username
        };
        var operator = {
            $set : { password : password }
        };
        modelAdmin.update(query, operator, function (err, data) {
            if(err){
                console.log("修改用户密码失败："+ err);
                req.session.error = "修改用户密码失败";
                res.redirect("/admin_profile");
            }
            console.log("修改用户密码成功");
            req.session.success = '修改用户密码成功';
            /**
             * 返回视图
             */
            res.redirect('/admin_profile');
            // res.redirect('/admin_index');
        });
    }
};

/**
 * 个人中心-修改个人密码-取消
 */
exports.admin_cancel_updatePassword = function (req, res) {
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
     * 获取数据
     * @type {*}
     */
    var username = req.body.username;
    var password = req.body.password;

    /**
     * 服务器校验
     */
    if(username == null || username == undefined){
        console.log('用户名不能为空');
        req.session.error = "用户名不能为空";
        res.redirect("/admin_toLogin");
    }else if(password == null || password == undefined){
        console.log('密码不能为空');
        req.session.error = "密码不能为空";
        res.redirect("/admin_toLogin");
    }else {

        /**
         * 查询用户是否存在
         */
        modelAdmin.findOne({
            username: username
        }, function (err, data) {
            if(err){
                console.log("查询用户名失败："+ err);
                req.session.error = "查询用户名失败";
                res.redirect("/admin_toLogin");
            }
            if(!data){
                console.log('用户不存在');
                req.session.error = "用户不存在";
                res.redirect("/admin_toLogin");
            }else {
                /**
                 * 将登录的密码转成md5形式
                 */
                var md5 = crypto.createHash("md5");
                var pwd = md5.update(password).digest("base64");
                /**
                 * 登录
                 */
                modelAdmin.findOne({
                    username: username,
                    password: pwd
                }, function (err, data) {
                    if(err){
                        console.log("查询用户密码失败："+ err);
                        req.session.error = "查询用户密码失败";
                        res.redirect("/admin_toLogin");
                    }
                    if(!data){
                        console.log("密码不正确");
                        req.session.error = "密码不正确";
                        res.redirect("/admin_toLogin");
                    }else {
                        console.log("登录成功");
                        /**
                         * 登录成功
                         * @type {string}
                         */
                        req.session.adminer = data;
                        /**
                         * 返回视图
                         */
                        res.redirect('/admin_index');
                    }


                });

            }
        });


    }

};
/**
 * 跳转到后台首页页面
 */
exports.admin_index = function (req, res) {
    res.render('backend/index/backend_index', { title: 'backend' });
};
/**
 * 注销功能
 */
exports.admin_logout = function (req, res) {
    res.locals.adminer = null;
    res.render('backend/admin/login', { title: 'backend' });
};

