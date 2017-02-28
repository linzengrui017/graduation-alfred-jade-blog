var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index/welcome', { title: 'Blog' });
    res.render('backend/index/backend_index', { title: 'backend' });
});

module.exports = router;
