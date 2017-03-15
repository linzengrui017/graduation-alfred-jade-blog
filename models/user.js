var mongoose = require('mongoose');

var friendSchema = new mongoose.Schema({
    username: String,         //好友名称
    createTime: {           //创建时间
        type: Date,
        default: Date.now()
    }
});

var userSchema = new mongoose.Schema({
    username: {                 //用户名
        type: String,
        unique: true
    },
    password: String,           //密码
    createTime: Date,           //创建时间
    modifyTime: {               //修改时间
        type: Date,
        default: Date.now()
    },
    delTag: {                   //删除标记
        type: Boolean,
        default: false
    },
    imageUrl : String,          //头像图片地址
    friends: [friendSchema],      //好友列表
    objectType: String          //用户类型：user, admin, 暂时不用
});

var modelUser = mongoose.model('user', userSchema);
module.exports = modelUser;