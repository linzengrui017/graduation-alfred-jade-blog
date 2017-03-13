/**
 * Created by lzr on 2017/2/21.
 */
var modelBlog = require('../../../models/blog');

//获取当前系统时间
var sd = require('silly-datetime');

/**
 * 跳转到微博管理主页
 */
exports.toWeiboManagePage = function (req, res) {
    res.render('backend/management/weibo_manage/weiboManage_index', { title: 'weibo_manage' });
};

/**
 * 查询微博
 */
exports.queryWeibo = function (req, res) {
    /**
     * 查询数据库
     */
    modelBlog.find({relayTag:false}, function (err, data) {
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

/**
 * 查询非法微博
 */
exports.queryIllegalWeibo = function (req, res) {

};

/**
 * 删除非法微博
 */
exports.delIllegalWeibo = function (req, res) {

};