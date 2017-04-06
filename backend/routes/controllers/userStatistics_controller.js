/**
 * Created by lzr on 2017/2/21.
 */

var redis = require("redis"),
    client = redis.createClient();

//获取当前系统时间
var sd = require('silly-datetime');

/**
 * 跳转到用户统计主页
 */
exports.toUsersStatisticsPage = function (req, res) {
    res.render('backend/management/users_manage/userStatistics', { title: 'userStatistics' });
};

/**
 * 查询网站访问量
 */
exports.queryUserTraffic = function (req, res) {
    var time = sd.format(new Date(), 'YYYY-MM-DD');
    var key = 'traffic-' + time;
    client.get(key, function (err, resp) {
        res.json({data: resp});
    });

};
