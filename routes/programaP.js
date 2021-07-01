var express = require('express');
var router = express.Router();
var dbConn = require('../db/db.js');


// ROTA PARA mostrar a pagina index.ejs, no evento da pasta raiz '/'
router.get('/', function (req, res, next) {
    dbConn.query('SELECT * FROM Programa_P', function (err, queryTeste) {
        if (err) {
            req.flash('error', err.message);
            // preparar dados para página em views/metrica/index.ejs. 'metrica' é a pasta em view
            res.render('metrica/programaP.ejs', { dataProduto: '' });
        } else {
            // preparar dados para página em views/editora/index.ejs
            res.render('metrica/programaP.ejs', { dataProduto: queryTeste });
        }
    });
});

router.get('/adicionar', function (req, res, next) {
    res.render('metrica/programaPInserir.ejs', {
        dt_implementacao: '',
    });
});

router.post('/adicionar', function (req, res, _) {    //'/adicionar' é o caminho indicado em inserir.ejs
    let dt_implementacao = req.body.dt_implementacao;

    var insereDados = {
        dt_implementacao: dt_implementacao
    }

    // ROTA PARA INSERIR REGISTRO
    dbConn.query('INSERT INTO Programa_O SET ?', insereDados, function (err, result) {
        if (err) { //if(err) throw err
            req.flash('error', err.message)
            // renderizar página inserir.ejs
            res.render('metrica/programaPInserir.ejs', {
                dt_implementacao: insereDados.dt_implementacao,
            })
        } else {
            console.log(result.insertId);
            req.flash('success', 'Inserido com sucesso');
            res.redirect('/programa_P/adicionar');
        }
    });
});


module.exports = router;