/**
 * Created by lzr on 2017/4/5.
 */

var express = require('express');
var router = express.Router();

var qr_image = require('qr-image');

/**
 * 二维码显示页面
 */
router.get('/toQrCode', function(req, res, next) {
    res.render('tool/qrCode', { title: 'qrCode' });
});

/**
 * 生成二维码
 */
router.get('/makeQrCode', function(req, res, next) {
    var temp_qrcode = qr_image.image('http://www.baidu.com');
    res.type('png');
    temp_qrcode.pipe(res);
});

module.exports = router;
