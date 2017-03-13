/**
 * Created by lzr on 2017/2/21.
 */

var modelBlog = require('../../models/blog');

var modelUser = require('../../models/user');

//使用md5加密
var crypto=require("crypto");

//获取当前系统时间
var sd = require('silly-datetime');


/**
 * 跳转到用户的个人主页
 */
exports.user = function (req, res) {
    var customer = req.session.user.username;
    res.render('user/profile', { title: 'Profile', customer: customer });
};

/**
 * 修改密码
 */
exports.user_update_password = function (req, res) {
    /**
     * 服务器端校验
     */
    var username = req.body.username;
    var pwd = req.body.pwd;
    var pwd2 = req.body.pwd2;
    if( null == username || '' == username){
        console.log('用户名不能为空');
        req.session.error = "用户名不能为空";
        res.redirect('/profile');
    } else if(pwd != pwd2){
        console.log('两次输入的密码不一致');
        req.session.error = "两次输入的密码不一致";
        res.redirect('/profile');
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
        modelUser.update(query, operator, function (err, data) {
            if(err){
                console.log("修改用户密码失败："+ err);
                req.session.error = "修改用户密码失败";
                res.redirect("/profile");
            }
            console.log("修改用户密码成功");
            req.session.success = '修改用户密码成功';
            /**
             * 返回视图
             */
            res.redirect('/profile');
        });
    }
};

/**
 * 跳转到他人主页
 */
exports.others = function (req, res) {
    res.render('user/others', { title: 'others' });
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
exports.reg = function (req, res, next) {
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
        res.redirect("/toLogin#signup");
    }else if(password == null || password == undefined){
        console.log('密码不能为空');
        req.session.error = "密码不能为空";
        res.redirect("/toLogin#signup");
    }else {

        /**
         * 查询用户是否存在
         */
        modelUser.findOne({
            username: username
        }, function (err, data) {
            if(err){
                console.log("查询用户失败："+ err);
                req.session.error = "查询用户失败";
                res.redirect("/toLogin#signup");
            }
            if(data){
                console.log("该用户已被注册");
                req.session.error = "该用户已被注册";
                res.redirect("/toLogin#signup");
            }else {
                /**
                 * 密码加密
                 */
                var md5 = crypto.createHash('md5');
                var pwd = md5.update(password).digest("base64");

                var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

                /**
                 * 注册
                 */
                var user= new modelUser({
                    username: username,
                    password: pwd,
                    createTime: time
                });
                user.save(function(err, data){

                    /**
                     * 新增操作异常
                     */
                    if(err){
                        console.log("注册异常:"+err);
                        res.redirect("/toLogin#signup");
                    }


                    console.log("注册成功");

                    /**
                     * 新增成功
                     * @type {string}
                     */
                    req.session.user = data;

                    /**
                     * 返回视图
                     */
                    res.redirect('/');

                });
            }
        });


    }




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
        res.redirect("/toLogin");
    }else if(password == null || password == undefined){
        console.log('密码不能为空');
        req.session.error = "密码不能为空";
        res.redirect("/toLogin");
    }else {

        /**
         * 查询用户是否存在
         */
        modelUser.findOne({
            username: username
        }, function (err, data) {
            if(err){
                console.log("查询用户名失败："+ err);
                req.session.error = "查询用户名失败";
                res.redirect("/toLogin");
            }
            if(!data){
                console.log('用户不存在');
                req.session.error = "用户不存在";
                res.redirect("/toLogin");
            }else {
                /**
                 * 将登录的密码转成md5形式
                 */
                var md5 = crypto.createHash("md5");
                var pwd = md5.update(password).digest("base64");
                /**
                 * 登录
                 */
                modelUser.findOne({
                    username: username,
                    password: pwd
                }, function (err, data) {
                    if(err){
                        console.log("查询用户密码失败："+ err);
                        req.session.error = "查询用户密码失败";
                        res.redirect("/toLogin");
                    }
                    if(!data){
                        console.log("密码不正确");
                        req.session.error = "密码不正确";
                        res.redirect("/toLogin");
                    }else {
                        console.log("登录成功");
                        /**
                         * 登录成功
                         * @type {string}
                         */
                        req.session.user = data;
                        /**
                         * 返回视图
                         */
                        res.redirect('/toAddPage');
                    }


                });

            }
        });


    }
};

/**
 * 注销功能
 */
exports.logout = function (req, res, next) {
    res.locals.user = null;
    res.render('index/welcome', { title: 'Blog' });
};

/**
 * 加关注功能
 */
exports.follow = function (req, res) {

};

/**
 * 解除关注功能
 */
exports.unfollow = function (req, res) {

};

/**
 * 查询个人全部微博功能
 */
exports.myBlogList = function (req, res) {
    var customer = req.session.user.username;
    var query = {
        author : customer
    };
    /**
     * 查询数据库
     */
    modelBlog.find(query, function (err, data) {
        if(err){
            console.log("查询微博失败:"+err);
            res.redirect("/");
        }

        /**
         * 返回数据
         */
        res.json({data: data});
        return data;

    }).sort({createTime: -1});
};