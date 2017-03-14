var express = require('express');
var router = express.Router();

/**
 * 导入具体的路由控制
 */
var usersManage = require('./controllers/usersManage_controller');

/**
 * 跳转到用户管理主页
 */
router.get('/toUsersManagePage', usersManage.toUsersManagePage);

/**
 * 查询用户
 */
router.post('/queryUsers', usersManage.queryUsers);

/**
 * 跳转到用户个人信息详情
 */
router.get('/toUserDetailPage', usersManage.toUserDetailPage);


/**
 * 显示用户个人信息详情
 */
router.get('/userDetail', usersManage.userDetail);


/**
 * 冻结用户
 */
router.post('/inactivateUser', usersManage.inactivateUser);


/**
 * 解封用户
 */
router.post('/unblockUser', usersManage.unblockUser);


/**
 * 显示冻结用户列表
 */
router.get('/toInactivateUserList', usersManage.toInactivateUserList);


/**
 * 显示解封用户列表
 */
router.get('/toUnblockUserList', usersManage.toUnblockUserList);


module.exports = router;
