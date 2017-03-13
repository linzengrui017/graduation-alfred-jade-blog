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
                        res.render('backend/index/backend_index', { title: 'backend' });
                    }


                });

            }
        });


    }

};

/**
 * 注销功能
 */
exports.admin_logout = function (req, res) {
    res.locals.adminer = null;
    res.render('backend/admin/login', { title: 'backend' });
};

