/**
 * Created by lzr on 2017/2/21.
 */

var modelBlog = require('../../models/blog');

//获取当前系统时间
var sd = require('silly-datetime');

/**
 * 跳转到写微博页面
 */
exports.toAddPage = function (req, res) {
    var customer = req.session.user.username;
    res.render('weibo/pubBlog', { title: 'pubBlog', customer: customer });
};

/**
 * 写微博
 */
exports.add = function (req, res) {

    /**
     * 获取数据
     */
    var title = req.body.title;
    var description = req.body.description;
    var author = req.session.user.username;
    /**
     * 服务器端表单校验
     */
    if(title == null || title == undefined){
        console.log('标题不能为空');
        req.session.error = "标题不能为空";
        res.redirect("/toAddPage");
    }else if(description == null || description == undefined){
        console.log('内容不能为空');
        req.session.error = "内容不能为空";
        res.redirect("/toAddPage");
    }else if (author == null || author == undefined){
        console.log('作者不能为空');
        req.session.error = "作者不能为空";
        res.redirect("/toAddPage");
    }else {
        /**
         * 插入微博
         */

        var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

        var blog = new modelBlog({
            author: author,
            title: title,
            content: description,
            createTime: time,
            modifyTime: time
        });

        blog.save(function (err, data) {
            /**
             * 新增操作异常
             */
            if(err){
                console.log("发微博操作异常:"+err);
                res.redirect("/toAddPage");
            }
            /**
             * 新增成功
             * 返回视图
             */
            console.log("成功发布微博");

            res.redirect('/toAddPage');
        });
    }

};

/**
 * 跳转到微博列表页面
 */
exports.toBlogListPage = function (req, res) {
    res.render('weibo/blogList', { title: 'blogList' });
};

/**
 * 显示微博列表
 */
exports.showBlogList = function (req, res) {

    /**
     * 查询数据库
     */
    modelBlog.find({}, function (err, data) {
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
 * 跳转到微博详情页面
 */
exports.toDetailBlogPage = function (req, res) {
    var author = req.query.author;
    var title = req.query.title;
    var customer = req.session.user.username;
    res.render('weibo/detailBlog', { title: 'detailBlog', author: author, title: title, customer: customer });
};

/**
 * 显示微博详情
 */
exports.showDetailBlog = function (req, res) {

    /**
     * 获取查询条件
     */
    var author = req.query.author;
    var title = req.query.title;

    var query = {
        author : author,
        title : title
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

    });
};

/**
 * 跳转到评论微博页面
 */
exports.toCommentBlogPage = function (req, res) {
    res.render('weibo/comment', { title: 'comment' });
};

/**
 * 评论微博
 */
exports.commentBlog = function (req, res) {
    /**
     * 获取数据
     */
    var customer = req.session.user.username;
    var author = req.query.author;
    var title = req.query.title;

    var comment_author = customer;
    var comment_content = req.query.comment_content;
    var comment_createTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

    /**
     * 服务器端校验
     */
    if( null == author || '' == author
        || null == title || '' == title
        || null == comment_content || '' == comment_content){

        console.log('必传参数不能为空');
        req.session.error = "必传参数不能为空";
        return;
    }

    /**
     * 准备数据
     * @type {{author: (*), title}}
     */
    var query = {
        author : author,
        title : title
    };

    var comment = {
        author : comment_author,
        content : comment_content,
        createTime : comment_createTime
    };

    var operator = {
        // $unset : { comments : comment }
        // $set : { comments : comment }
        "$push" : { comments : comment }
    };

    /**
     * 往该微博里添加评论数据
     * 执行修改追加操作
     */
    modelBlog.update(query, operator, function (err, data) {
        if(err){
            console.log('添加评论失败：'+ err);
            return;
        }

        console.log('添加成功');
        // res.end();

    });

    /**
     * 返回视图
     */
    // res.redirect('/toAddPage');
    res.redirect('/toDetailBlogPage?author='+author+'&title='+title);
    // res.end();

};

/**
 * 删除单条评论
 */
exports.delComment = function (req, res) {

};

/**
 * 删除单条微博
 */
exports.delBlog = function (req, res) {
    var author = req.query.author;
    var title = req.query.title;

    if(author == null || author == ''){
        console.log('作者不能为空');
        req.session.error = "作者不能为空";
        res.redirect("/");
        return;
    }
    if(title == null || title == ''){
        console.log('标题不能为空');
        req.session.error = "标题不能为空";
        res.redirect("/");
        return;
    }
    var query = {
        author: author,
        title: title
    };
    modelBlog.remove(query, function (err, data) {
        if(err){
            console.log("删除微博失败:"+err);
            res.redirect("/");
        }

        /**
         * 删除成功
         * 返回视图
         */
        console.log("删除微博成功");
        // res.redirect("/toAddPage");
        res.end();

    });

};

/**
 * 跳转到转发微博页面
 */
exports.toForwardBlogPage = function (req, res) {

};

/**
 * 转发微博
 */
exports.forwardBlog = function (req, res) {

};