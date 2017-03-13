var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
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
    objectType: String          //管理员级别：regular admin, super admin, 暂时不用
});

var modelAdmin = mongoose.model('admin', adminSchema);
module.exports = modelAdmin;