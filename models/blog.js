var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: String,
    content: Mixed,
    author: String,
    createTime: Date,
    modifyTime: {
        type: Date,
        default: Date.now()
    },
    delTag: {
        type: Boolean,
        default: false
    },
    relayTag: {
        type: Boolean,
        default: false
    },
});

var modelBlog = mongoose.model('blog', blogSchema);
module.exports = modelBlog;