var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});

var modelUser = mongoose.model('user', userSchema);
module.exports = modelUser;