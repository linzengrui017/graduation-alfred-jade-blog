var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/backend_dashboard', function(req, res, next) {
    res.render('backend/index/backend_index', { title: 'backend' });
});





module.exports = router;
