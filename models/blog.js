var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    imageUrl : String,          //头像图片地址
    author: String,         //评论人名称
    content: String,        //评论内容
    createTime: {           //创建时间
        type: Date,
        default: Date.now()
    }
});

var relaySchema = new mongoose.Schema({
    imageUrl : String,          //头像图片地址
    author: String,         //转发微博的作者
    title: String,          //转发微博的标题
    content: String,         //转发微博的内容
    img: String              //图片地址集合
});

var blogSchema = new mongoose.Schema({
    imageUrl : String,          //头像图片地址
    author: String,                 //作者
    title: String,                  //标题
    content: String,                //内容
    img: String,                    //图片地址集合
    comments: [commentSchema],      //评论内容
    relayContent: relaySchema,      //转发的微博
    relayTag :{                     //转发标记
        type : Boolean,
        default : false
    },
    createTime: {                   //创建时间
        type: Date,
        default: Date.now()
    }
});

var modelBlog = mongoose.model('blog', blogSchema);
module.exports = modelBlog;