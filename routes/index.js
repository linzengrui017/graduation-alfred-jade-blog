var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
    res.render('weibo/blogList', { title: 'blogList', pageNum: req.query.page});
});

router.get('/backend', function(req, res, next) {
    res.render('backend/admin/login', { title: 'backend' });
});

module.exports = router;
