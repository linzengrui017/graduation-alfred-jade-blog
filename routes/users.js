var express = require('express');
var router = express.Router();

//express官方推荐的文件上传中间件
var multer = require('multer');
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
 * 暂时不用
 */
router.get('/toReg', user.toReg);
/**
 * 注册功能
 */
router.post('/reg', user.reg);
/**
 * 跳转到登录页面
 */
router.get('/toLogin', user.toLogin);
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

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/images/upload')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});
var upload = multer({
    storage: storage
});

/**
 * 上传用户头像
 */
router.post('/uploadUserImage', upload.single('file'), user.uploadUserImage);



module.exports = router;
