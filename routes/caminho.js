var express = require('express');
var router = express.Router();
var dbConn = require('../db/db.js');


// ROTA PARA mostrar a pagina index.ejs, no evento da pasta raiz '/'
router.get('/', function (req, res, next) {
    dbConn.query('SELECT * from caminho', function (err, queryTeste) {
        if (err) {
            req.flash('error', err.message);
            // preparar dados para página em views/metrica/index.ejs. 'metrica' é a pasta em view
            res.render('metrica/caminho.ejs', { dataProduto: '' });
        } else {
            // preparar dados para página em views/editora/index.ejs
            res.render('metrica/caminho.ejs', { dataProduto: queryTeste });
        }
    });
});

router.get('/adicionar', function (req, res, next) {
    res.render('metrica/caminhoInserir.ejs', {
        id_caminho: '',
        descricao: '',
        def_uso: '',
        subcaminho: '',
        ido: '',
        idp: ''
    });
});

router.post('/adicionar', function (req, res, _) {    //'/adicionar' é o caminho indicado em inserir.ejs
    let id_caminho = req.body.id_caminho;
    let descricao = req.body.descricao;
    let def_uso = req.body.def_uso;
    let subcaminho = req.body.subcaminho;
    let ido = req.body.ido;
    let idp = req.body.idp;

    var insereDados = {
        id_caminho: id_caminho,
        descricao: descricao,
        def_uso: def_uso,
        subcaminho: subcaminho,
        ido: ido,
        idp: idp
    }

    // ROTA PARA INSERIR REGISTRO
    dbConn.query('INSERT INTO caminho SET ?', insereDados, function (err, result) {
        if (err) { //if(err) throw err
            req.flash('error', err.message)
            // renderizar página inserir.ejs
            res.render('metrica/caminhoInserir.ejs', {
                id_caminho: insereDados.id_caminho,
                descricao: insereDados.descricao,
                def_uso: insereDados.def_uso,
                subcaminho: insereDados.subcaminho,
                ido: insereDados.ido,
                idp: insereDados.idp
            })
        } else {
            console.log(result.insertId);
            req.flash('success', 'Inserido com sucesso');
            res.redirect('/caminho/adicionar');
        }
    });
});


module.exports = router;