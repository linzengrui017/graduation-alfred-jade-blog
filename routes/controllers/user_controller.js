/**
 * Created by lzr on 2017/2/21.
 */

var modelBlog = require('../../models/blog');

var modelUser = require('../../models/user');

/**
 * 使用log4js
 * @type {Logger}
 */
var Logger = require("../Logger.js").getLogger();

//使用md5加密
var crypto=require("crypto");

//获取当前系统时间
var sd = require('silly-datetime');

//使用uuid
var UUID = require('uuid');

//发送邮件
var nodemailer = require('nodemailer');

//服务器地址
var config = require('../../config/config');

//邮件机器人
var blogSystem = require('../../config/email');

/**
 * 验证码
 */
var ccap = require('ccap');

/**
 * 跳转到用户的个人主页
 */
exports.user = function (req, res) {
    var customer = req.session.user.username;
    var query = {
        username : customer
    };
    modelUser.findOne(query, function (err, data) {
        if(err){
            req.session.error = "查询用户失败";
            Logger.info("customer: %s, 查询用户失败：%s", customer, err);
            res.redirect('/toAddPage?page=1');
        }
        var imageUrl = data.imageUrl;
        Logger.info("customer: %s, 跳转到用户的个人主页", customer);
        res.render('user/profile', { title: 'Profile', customer: customer, imageUrl:imageUrl });
    });

};

/**
 * 修改密码
 */
exports.user_update_password = function (req, res) {
    /**
     * 服务器端校验
     */
    var customer = req.session.user.username;
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
                Logger.info("customer: %s, 修改用户密码失败：%s", username, err);
                res.redirect("/profile");
            }
            console.log("修改用户密码成功");
            req.session.success = '修改用户密码成功';
            Logger.info("customer: %s, 修改用户密码成功", username);
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
    var customer = req.session.user.username;
    var author = req.query.author;
    var query = {
        username : author
    };
    modelUser.findOne(query, function (err, data) {
        if(err){
            console.log("查询用户失败："+ err);
            req.session.error = "查询用户失败";
            Logger.info("customer: %s, 查看 %s 的主页, 查询用户失败：%s", customer, author, err);
            res.redirect('/toAddPage?page=1');
        }
        var imageUrl = data.imageUrl;
        Logger.info("customer: %s, 查看 %s 的主页", customer, author);
        res.render('user/others', { title: 'others', author: author, imageUrl:imageUrl });
    });

};

/**
 * 跳转到注册页面
 * 暂时不用
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
        res.redirect("/toRegister_form");
    }else if(password == null || password == undefined){
        console.log('密码不能为空');
        req.session.error = "密码不能为空";
        res.redirect("/toRegister_form");
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
                Logger.info("注册功能，查询用户失败：%s", err);
                res.redirect("/toRegister_form");
            }
            if(data){
                console.log("该用户已被注册");
                req.session.error = "该用户已被注册";
                Logger.info("该用户 %s 已被注册", username);
                res.redirect("/toRegister_form");
            }else {
                /**
                 * 密码加密
                 */
                var md5 = crypto.createHash('md5');
                var pwd = md5.update(password).digest("base64");

                var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

                var state = false;  //激活状态：默认是未激活

                /**
                 * 生成激活码
                 * UUID.v1 基于时间戳生成(time based)
                 * UUID.v4 随机生成(random), 有一定几率重复
                 */
                var ActiCode = UUID.v1();

                /**
                 * 注册
                 */
                var user= new modelUser({
                    username: username,
                    password: pwd,
                    createTime: time,
                    state : state,
                    ActiCode : ActiCode
                });
                user.save(function(err, data){

                    /**
                     * 新增操作异常
                     */
                    if(err){
                        console.log("注册异常:"+err);
                        res.redirect("/toRegister_form");
                    }

                    /**
                     * 新增成功
                     * @type {string}
                     */
                    req.session.user = data;

                    /**
                     * 跳页面
                     * 提示点击邮箱注册
                     */
                    res.render('user/register_email', { title: 'register_email', username: username, ActiCode: ActiCode });


                });
            }
        });


    }




};

/**
 * 跳转到登录页面
 * 暂时不用
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
        res.redirect("/toLogin_form");
    }else if(password == null || password == undefined){
        console.log('密码不能为空');
        req.session.error = "密码不能为空";
        res.redirect("/toLogin_form");
    }else {

        /**
         * 查询用户是否存在
         */
        modelUser.findOne({
            username: username,
            delTag: false
        }, function (err, data) {
            if(err){
                console.log("查询用户名失败："+ err);
                req.session.error = "查询用户名失败";
                Logger.info("登录功能, 查询用户失败：%s", err);
                res.redirect("/toLogin_form");
            }
            if(!data){
                console.log('用户不存在');
                req.session.error = "用户不存在";
                Logger.info("登录功能, 用户 %s 不存在", username);
                res.redirect("/toLogin_form");
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
                        Logger.info("登录功能, 查询用户 %s 的密码失败：%s", username, err);
                        res.redirect("/toLogin_form");
                    }
                    if(!data){
                        console.log("密码不正确");
                        req.session.error = "密码不正确";
                        Logger.info("登录功能, 用户 %s 的密码不正确", username);
                        res.redirect("/toLogin_form");
                    }else {
                        console.log("登录成功");

                        Logger.info("用户 %s 登录成功", username);
                        /**
                         * 登录成功
                         * @type {string}
                         */
                        req.session.user = data;
                        /**
                         * 返回视图
                         */
                        res.redirect('/toAddPage?page=1');
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
    var customer = req.session.user.username;
    Logger.info("customer: %s, 退出系统", customer);

    req.session.user = null;
    res.locals.user = null;
    // res.render('weibo/blogList', { title: 'blogList' });
    res.redirect("/index?page=1");
};

/**
 * 加关注功能
 */
exports.follow = function (req, res) {
    /**
     * 获取名称
     */
    var customer = req.session.user.username;
    var username = req.query.username;
    /**
     * 服务器端校验
     */
    if( null == username || '' == username){
        console.log('必传参数不能为空');
        req.session.error = "必传参数不能为空";
        Logger.info("customer: %s, 加关注用户 %s , 必传参数不能为空", customer, username);
        res.end();
    }else if(customer == username){
        console.log('逻辑错误：本人不应该在好友列表里');
        req.session.error = "逻辑错误：本人不应该在好友列表里";
        Logger.info("customer: %s, 加关注用户 %s , 逻辑错误：本人不应该在好友列表里", customer, username);
        res.end();
    }else {
        /**
         * 添加好友
         */

        /**
         * 准备数据
         * @type {{username}}
         */
        var query = {
            username : customer
        };
        var friend = {
            username: username
        };
        var operator = {
            "$push" : { friends : friend }
        };
        /**
         * 执行修改追加操作
         */
        modelUser.update(query, operator, function (err, data) {
            if(err){
                console.log('添加好友失败：'+ err);
                Logger.info("customer: %s, 将用户 %s 添加为好友的操作失败：%s", customer, username, err);
                return;
            }
            Logger.info("customer: %s, 成功将用户 %s 添加为好友", customer, username);
            console.log('添加好友成功');
            // res.end();
        });
        /**
         * 返回
         */
        res.end();



    }



};

/**
 * 解除关注功能
 */
exports.unfollow = function (req, res) {
    /**
     * 获取名称
     */
    var customer = req.session.user.username;
    var username = req.query.username;
    /**
     * 服务器端校验
     */
    if( null == username || '' == username){
        console.log('必传参数不能为空');
        req.session.error = "必传参数不能为空";
        Logger.info("customer: %s, 加关注用户 %s , 必传参数不能为空", customer, username);
        res.end();
    }else if(customer == username){
        console.log('逻辑错误：本人不应该在好友列表里');
        req.session.error = "逻辑错误：本人不应该在好友列表里";
        Logger.info("customer: %s, 加关注用户 %s , 逻辑错误：本人不应该在好友列表里", customer, username);
        res.end();
    }else {
        /**
         * 删除好友
         */

        /**
         * 准备数据
         * @type {{username}}
         */
        var query = {
            username : customer
        };
        var friend = {
            username: username
        };
        var operator = {
            "$pull" : { friends : friend }
        };
        /**
         * 执行修改追加操作
         */
        modelUser.update(query, operator, function (err, data) {
            if(err){
                console.log('删除好友失败：'+ err);
                Logger.info("customer: %s, 删除好友 %s 的操作失败：%s", customer, username, err);
                return;
            }
            console.log('删除好友成功');
            Logger.info("customer: %s, 成功删除好友 %s ", customer, username);
            // res.end();
        });
        /**
         * 返回
         */
        res.end();



    }
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
            Logger.info("customer: %s, 查看个人微博失败：%s", customer, err);
            res.redirect("/");
        }

        Logger.info("customer: %s, 查看个人微博", customer);
        /**
         * 返回数据
         */
        res.json({data: data});
        return data;

    }).sort({createTime: -1});
};

/**
 * 跳转到 上传头像 页面
 */
exports.toUploadCustomerImagePage = function (req, res) {

};

/**
 * 上传用户头像
 */
exports.uploadUserImage = function (req, res) {
    /**
     * 将图片地址关联到数据库
     */

    /**
     *  修改个人头像
     *  修改userSchema的imageUrl
     */
    var customer = req.session.user.username;
    var image_url = '/images/upload/' + req.file.originalname;

    Logger.info("customer: %s, 准备修改个人头像, 头像相对地址： %s ", customer, image_url);

    var query = {
        username : customer
    };
    var operator = {
        $set : { imageUrl : image_url }
    };
    modelUser.update(query, operator, function (err, data) {
        if(err){
            console.log("修改userSchema的图片地址失败："+ err);
            req.session.error = "修改userSchema的图片地址失败";
            Logger.info("customer: %s, 修改userSchema的图片地址失败：%s", customer, err);
            res.redirect("/profile");
        }
        console.log("修改userSchema的图片地址成功");
        Logger.info("customer: %s, 修改userSchema的图片地址成功", customer);
        req.session.success = '修改userSchema的图片地址成功';
    });

    /**
     *  批量 修改 blogSchema 的 imageUrl
     */
    var blogQuery = {
        author : customer
    };
    var blogOperator = {
        $set : { imageUrl : image_url }
    };
    modelBlog.update(blogQuery, blogOperator, {multi: true}, function (err, data) {
        if(err){
            console.log("修改blogSchema的图片地址失败："+ err);
            Logger.info("customer: %s, 修改blogSchema的图片地址失败：%s", customer, err);
            req.session.error = "修改blogSchema的图片地址失败";
            res.redirect("/profile");
        }
        console.log("修改blogSchema的图片地址成功");
        Logger.info("customer: %s, 修改blogSchema的图片地址成功", customer);
        req.session.success = '修改blogSchema的图片地址成功';
    });

    /**
     *  批量修改relaySchema的imageUrl
     */
    var relayQuery = {
        "relayContent.author" : customer
    };
    var relayOperator = {
        $set : { "relayContent.imageUrl" : image_url }
    };
    modelBlog.update(relayQuery, relayOperator, {multi: true}, function (err, data) {
        if(err){
            console.log("修改relaySchema的图片地址失败："+ err);
            Logger.info("customer: %s, 修改relaySchema的图片地址失败：%s", customer, err);
            req.session.error = "修改relaySchema的图片地址失败";
            res.redirect("/profile");
        }
        console.log("修改relaySchema的图片地址成功");
        Logger.info("customer: %s, 修改relaySchema的图片地址成功", customer);
        req.session.success = '修改relaySchema的图片地址成功';
    });

    /**
     *  批量修改commentSchema的imageUrl
     */
    var commentQuery = {
        "comments.author" : customer
    };
    var commentOperator = {
        $set : { "comments.$.imageUrl" : image_url }
    };
    modelBlog.update(commentQuery, commentOperator, {multi: true}, function (err, data) {
        if(err){
            console.log("修改commentSchema的图片地址失败："+ err);
            req.session.error = "修改commentSchema的图片地址失败";
            Logger.info("customer: %s, 修改commentSchema的图片地址失败：%s", customer, err);
            res.redirect("/profile");
        }
        console.log("修改commentSchema的图片地址成功");
        Logger.info("customer: %s, 修改commentSchema的图片地址成功", customer, err);
        req.session.success = '修改commentSchema的图片地址成功';
    });

    Logger.info("customer: %s, 成功上传头像", customer);

    /**
     * 返回数据
     * @type {string}
     */
    var url = 'http://' + req.headers.host + '/images/upload/' + req.file.originalname;
    res.json({
        code : 200,
        data : url
    });
    // res.end();
};

/**
 * 显示界面右上角的头像
 */
exports.showCustomerImage = function (req, res) {
    var user = req.session.user;
    if( '' != user && null != user){
        var customer = req.session.user.username;
        var query = {
            username : customer
        };
        modelUser.findOne(query, function (err, data) {
            if(err){
                console.log("查询用户失败："+ err);
                req.session.error = "查询用户失败";
                Logger.info("customer: %s, 显示界面右上角的头像时, 查询用户失败：%s", customer, err);
                res.redirect('/toAddPage?page=1');
            }
            Logger.info("customer: %s, 显示界面右上角的头像", customer);
            res.json({data: data});
            // return data;
        });
    }else {
        Logger.info("customer: %s, 显示界面右上角的头像, 用户还未上传头像", user);
        res.json({data: {'imageUrl': ''}});
    }



};

/**
 * 查询他人全部微博功能
 */
exports.otherBlogList = function (req, res) {
    var customer = req.session.user.username;
    var author = req.query.author;
    var query = {
        author : author
    };
    /**
     * 查询数据库
     */
    modelBlog.find(query, function (err, data) {
        if(err){
            console.log("查询微博失败:"+err);
            Logger.info("customer: %s, 查看 %s 的全部微博时, 查询微博失败：%s", customer, author, err);
            res.redirect("/");
        }

        Logger.info("customer: %s, 查看 %s 的全部微博", customer, author);

        /**
         * 返回数据
         */
        res.json({data: data});
        return data;

    }).sort({createTime: -1});
};

/**
 * 查询他人是否是好友
 */
exports.checkFriends = function (req, res) {
    var customer = req.session.user.username;
    var username = req.query.username;
    var query = {
        username : customer,
        "friends.username": username
    };
    /**
     * 查询数据库
     */
    modelUser.find(query, function (err, data) {
        if(err){
            console.log("查询好友列表失败:"+err);
            Logger.info("customer: %s, 在好友列表中查询 %s 时, 查询用户失败：%s", customer, username, err);
            res.redirect("/");
        }
        Logger.info("customer: %s, 在好友列表中查询 %s ", customer, username);
        /**
         * 返回数据
         */
        res.json({data: data});
        return data;

    });
};

/**
 * 查询好友列表
 */
exports.queryFriends = function (req, res) {
    var customer = req.session.user.username;
    var query = {
        username : customer,
        delTag: false
    };
    /**
     * 查询数据库
     */
    modelUser.find(query, function (err, data) {
        if(err){
            console.log("查询好友列表失败:"+err);
            Logger.info("customer: %s, 查询好友列表失败：%s", customer, err);
            res.redirect("/");
        }

        var friends = data[0].friends;
        Logger.info("customer: %s, 查询好友列表", customer);
        /**
         * 返回数据
         */
        res.json({data: friends});

    });
};

/**
 * 查询好友微博
 */
exports.queryFriendsBlogList = function (req, res) {
    var customer = req.session.user.username;
    var query = {
        username : customer,
        delTag: false
    };
    /**
     * 查询数据库
     */
    modelUser.find(query, function (err, data) {
        if(err){
            console.log("查询好友列表失败:"+err);
            Logger.info("customer: %s, 查询好友微博功能，查询好友列表失败：%s", customer, err);
            res.redirect("/");
        }

        var friends = data[0].friends;
        var names = [];
        for(var i = 0; i < friends.length; i++){
            names[i] = friends[i].username;
        }

        /**
         * 查询好友微博列表
         */
        var collection = {
            $in : names
        };
        var qry = {
            author : collection
        };
        modelBlog.find(qry, function (err, data) {
            if(err){
                console.log("查询好友微博失败:"+err);
                Logger.info("customer: %s, 查询好友微博功能，查询好友微博失败：%s", customer, err);
                res.redirect("/");
            }
            Logger.info("customer: %s, 查询好友微博", customer);
            res.json({data: data});
        }).sort({createTime: -1});

    });
};

/**
 * 跳转到 我的好友 页面
 */
exports.toFriendPage = function (req, res) {
    var customer = req.session.user.username;
    Logger.info("customer: %s, 查看 我的好友", customer);
    res.render('user/friends', { title: 'friends' });
};

/**
 * 跳转到注册页面
 */
exports.toRegister_form = function (req, res, next) {
    res.render('user/register_form', { title: 'register' });
};

/**
 * 跳转到登录页面
 */
exports.toLogin_form = function (req, res, next) {
    /**
     * 生成验证码
     */
    var captcha = ccap();
    var ary = captcha.get();//ary[0] is captcha's text,ary[1] is captcha picture buffer.
    var txt = ary[0];
    var buffer = ary[1];
    /**
     * 返回视图
     */
    res.render('user/login_form', { title: 'Login', txt : txt, buffer : buffer  });
};

/**
 * 获取验证码
 */
exports.toGetCode = function (req, res, next) {
    /**
     * 生成验证码
     */
    var captcha = ccap();
    var ary = captcha.get();//ary[0] is captcha's text,ary[1] is captcha picture buffer.
    var txt = ary[0];
    var buffer = ary[1];

    res.json({data: txt});

};

/**
 * 邮箱注册
 * 激活按钮 发送邮件
 */
exports.sendEmail = function (req, res, next) {
    /**
     * 获取数据
     */
    var username = req.query.username;
    var ActiCode = req.query.ActiCode;
    var email = req.query.email;

    /**
     * 校验
     */
    if(username == '' || username == null ||
        ActiCode == '' || ActiCode == null){
        res.end();
        return;
    }

    /**
     * 设置邮件内容
     * @type {string}
     */
    var subject = '微博系统注册验证';                                        // 标题
    var text = 'http://'+ config.host + ':' + config.port +'/url' + '?username=' + username + '&ActiCode=' + ActiCode;             // 验证URL
    var html = '<h4>请点击链接完成注册:<a href='+ text + '> '+ text + '</a></h4>';     // 邮件内容

    Logger.info("激活URL：%s", text);

    /**
     * 创建服务
     */
    var transporter = nodemailer.createTransport({
        service: 'qq',
        port: 465, // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: {
            user: blogSystem.user,  //发件人
            pass: blogSystem.pass   //smtp密码
        }
    });

    /**
     * 设置参数
     * @type {{from: string, to: string, subject: string, text: string, html: string}}
     */
    var mailOptions = {
        from: blogSystem.user, // 发件地址
        to: email, // 收件列表
        subject: subject, // 标题
        //text和html两者只支持一种
        text: text, // 标题
        html: html // html 内容
    };

    /**
     * 发送邮件
     */
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });

    res.render('user/register_wait', { title : 'register_wait'});

    // res.end();
};

/**
 * 邮箱注册
 * 激活URL 验证激活
 */
exports.url = function (req, res, next) {
    /**
     * 获取数据
     */
    var username = req.query.username;
    var ActiCode = req.query.ActiCode;

    /**
     * 激活成功页的URL逻辑
     * 以用户id和激活码查询数据库
     * 存在，修改字段state为true
     * 不存在，提示激活失败
     */
    var query = {
        username : username,
        ActiCode : ActiCode
    };
    var operator = {
        $set : { state : true }
    };
    modelUser.update(query, operator, function (err, data) {
        if(err){
            console.log("激活用户失败："+ err);
            req.session.error = "激活用户失败";
            Logger.info("customer: %s, 激活用户失败：%s", username, err);
            res.redirect('/');
        }

        /**
         * 注册成功
         */
        Logger.info("用户 %s 注册成功", username);
        console.log("注册成功");

        /**
         * 返回视图
         */
        res.redirect('/toAddpage?page=1');

    });


};