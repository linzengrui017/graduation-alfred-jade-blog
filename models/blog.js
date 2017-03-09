var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    author: String,         //评论人名称
    content: String,        //评论内容
    createTime: {           //创建时间
        type: Date,
        default: Date.now()
    }
});

var blogSchema = new mongoose.Schema({
    author: String,         //作者
    title: String,          //标题
    content: String,        //内容
    img: String,            //图片地址集合
    comments: [commentSchema],  //评论内容
    relayTag: {             //转发标记
        type: Boolean,
        default: false
    },
    relayReason: String,    //转发理由
    delTag: {               //删除标记
        type: Boolean,
        default: false
    },
    createTime: {           //创建时间
        type: Date,
        default: Date.now()
    },
    modifyTime: {           //修改时间
        type: Date,
        default: Date.now()
    }
});

var modelBlog = mongoose.model('blog', blogSchema);
module.exports = modelBlog;