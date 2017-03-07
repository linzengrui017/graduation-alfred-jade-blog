var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    createTime: Date,
    modifyTime: {
        type: Date,
        default: Date.now()
    },
    delTag: {
        type: Boolean,
        default: false
    }
});

var modelUser = mongoose.model('user', userSchema);
module.exports = modelUser;