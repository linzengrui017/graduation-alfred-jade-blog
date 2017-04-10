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
            res.redirect("/backend_dashboard");
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
    /**
     * 获取数据
     */
    var id = req.query._id;
    /**
     * 校验
     */
    if( null == id || '' == id){
        console.log('必传参数不能为空');
        req.session.error = "必传参数不能为空";
    }else {
        /**
         * 准备数据
         */
        var query = {
            _id : id
        };
        /**
         * 删除操作
         */
        modelBlog.remove(query, function (err, data) {
            if(err){
                console.log("删除微博失败:"+err);
                res.redirect("/");
            }
            /**
             * 删除成功
             * 返回视图
             */
            console.log("删除微博成功,id:" + id);
            res.end();
        });
    }
};

/**
 * 跳转到 转发微博 页面
 */
exports.toRelayBlogManagePage = function (req, res) {
    res.render('backend/management/weibo_manage/relayWeibo', { title: 'relayWeibo' });
};

/**
 * 显示 转发微博
 */
exports.showRelayBlogList = function (req, res) {
    /**
     * 查询数据库
     */
    modelBlog.find({relayTag:true}, function (err, data) {
        if(err){
            console.log("查询微博失败:"+err);
            res.redirect("/backend_dashboard");
        }

        /**
         * 返回数据
         */
        res.json({data: data});
        return data;

    }).sort({createTime: -1});
};

/**
 * 按条件查询 同一条被转发的微博
 */
exports.queryRelayBlog = function (req, res) {
    var author = req.query.author;
    var title = req.query.title;
    var query = {
        "relayContent.author" : author,
        "relayContent.title" : title
    };
    /**
     * 查询数据库
     */
    modelBlog.find(query, function (err, data) {
        if(err){
            console.log("查询微博失败:"+err);
            res.redirect("/backend_dashboard");
        }

        /**
         * 返回数据
         */
        res.json({data: data});
        return data;

    }).sort({createTime: -1});
};

/**
 * 查询 原微博 被转发数
 */
exports.showBlogRelayNumList = function (req, res) {
    /**
     * 获取数据
     * 校验
     */
    var id = req.query._id;
    if( null == id || '' == id){
        console.log('必传参数不能为空');
        req.session.error = "必传参数不能为空";
    }else {
        /**
         * 查询数据库
         */
        var query = {
            _id : id,
            relayTag: false
        };
        modelBlog.find(query, function (err, data) {
            if(err){
                console.log("查询微博失败:"+err);
                res.redirect("/backend_dashboard");
            }

            var relayNum = data.relayNum;

            /**
             * 返回数据
             */
            res.json({data: relayNum});

        }).sort({createTime: -1});
    }
};