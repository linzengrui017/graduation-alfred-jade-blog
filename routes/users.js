var express = require('express');
var router = express.Router();

//express官方推荐的文件上传中间件
var multer = require('multer');

/**
 * 导入配置文件
 */
var config = require('../config/config');

/**
 * 导入具体的路由控制
 */
var user = require('./controllers/user_controller');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/**
 * 跳转到用户的个人主页
 */
router.get('/profile', user.user);
/**
 * 修改密码
 */
router.post('/user_update_password', user.user_update_password);
/**
 * 跳转到他人主页
 */
router.get('/others', user.others);
/**
 * 跳转到注册页面
 */
// router.get('/toReg', user.toReg);

router.get('/toRegister_form', user.toRegister_form);

/**
 * 注册功能
 */
router.post('/reg', user.reg);
/**
 * 跳转到登录页面
 */
router.get('/toLogin', user.toLogin);

router.get('/toLogin_form', user.toLogin_form);
/**
 * 登录功能
 */
router.post('/login', user.login);
/**
 * 注销功能
 */
router.get('/logout', user.logout);
/**
 * 加关注功能
 */
router.post('/follow', user.follow);
/**
 * 解除关注功能
 */
router.post('/unfollow', user.unfollow);
/**
 * 查询个人全部微博功能
 */
router.post('/myBlogList', user.myBlogList);

/**
 * 跳转到 上传头像 页面
 */
router.get('/toUploadCustomerImagePage', user.toUploadCustomerImagePage);

/**
 * 上传用户头像
 */
var storage = multer.diskStorage({
    //设置上传后文件路径，upload文件夹会自动创建
    destination: function (req, file, cb){
        cb(null, config.uploadUrl)
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});
//添加配置文件到muler对象
var upload = multer({
    storage: storage
});
/**
 * multer有single()中的名称必须是表单上传字段的name名称
 * muilter.single('file'), //适用于单文件上传
 * muilter.array('file,num), //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num,
 * muilter.fields(fields), //适用于混合上传，比如A类文件1个，B类文件
 */
router.post('/uploadUserImage', upload.single('file'), user.uploadUserImage);

/**
 * 显示界面右上角的头像
 */
router.post('/showCustomerImage', user.showCustomerImage);

/**
 * 查询他人全部微博功能
 */
router.post('/otherBlog', user.otherBlogList);

/**
 * 查询他人是否是好友
 */
router.post('/checkFriends', user.checkFriends);

/**
 * 查询好友列表
 */
router.post('/queryFriends', user.queryFriends);

/**
 * 查询好友微博
 */
router.post('/queryFriendsBlogList', user.queryFriendsBlogList);

/**
 * 跳转到 我的好友 页面
 */
router.get('/toFriendPage', user.toFriendPage);

module.exports = router;
