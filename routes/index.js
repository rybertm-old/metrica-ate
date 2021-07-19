const { query } = require('express');
var express = require('express');
var router = express.Router();
var dbConn = require('../db/db.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  dbConn.query('SELECT * FROM dados_tm', function (err, querytm) {
    if (err) {
      req.flash('error', err.message);
      // preparar dados para página em views/metrica/index.ejs. 'metrica' é a pasta em view
      res.render('index', { datatm: '' });
    } else {
      // preparar dados para página em views/editora/index.ejs
      res.render('index', { datatm: querytm });
    }
  });
});



module.exports = router;
