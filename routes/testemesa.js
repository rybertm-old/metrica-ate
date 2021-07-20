var express = require('express');
var router = express.Router();
var dbConn = require('../db/db.js');


// ROTA PARA mostrar a pagina index.ejs, no evento da pasta raiz '/testemesa'
router.get('/', function (req, res, next) {
    dbConn.query('SELECT * FROM teste_mesa p ORDER BY p.id_testemesa desc', function (err, queryTeste) {
        if (err) {
            req.flash('error', err.message);
            // preparar dados para página em views/metrica/index.ejs. 'metrica' é a pasta em view
            res.render('metrica/testemesa.ejs', { dataProduto: '' });
        } else {
            // preparar dados para página em views/editora/index.ejs
            res.render('metrica/testemesa.ejs', { dataProduto: queryTeste });
        }
    });
});

router.get('/adicionar', function (req, res, next) {
    var sql1 = 'SELECT id_casoteste FROM caso_teste';
    var sql2 = 'SELECT id_dadostm FROM dados_tm';
    dbConn.query(sql1, function (er, queryP) {
        if (er) {
            req.flash('error', er.message)
            res.render('metrica/testemesaInserir.ejs', {
                dataP: [],
                dataO: [],
                dt_testemesa: '',
                iddados: '',
                id_ct: ''
            })
        }
        dbConn.query(sql2, function (err, queryO) {
            if (err) {
                req.flash('error', err.message)
                res.render('metrica/testemesaInserir.ejs', {
                    dataP: [],
                    dataO: [],
                    dt_testemesa: '',
                    iddados: '',
                    id_ct: ''
                })
            }
            res.render('metrica/testemesaInserir.ejs', {
                dataP: queryP,
                dataO: queryO,
                dt_testemesa: '',
                iddados: '',
                id_ct: ''
            });

        });
    });
});

//'/adicionar' é o caminho indicado em inserir.ejs
router.post('/adicionar', function (req, res, _) {    
    let iddados = req.body.iddados;
    let id_ct = req.body.id_ct;
    let dt_testemesa = req.body.dt_testemesa;

    var insereDados = {
        iddados,
        id_ct,
        dt_testemesa
    }

    // ROTA PARA INSERIR REGISTRO
    dbConn.query('INSERT INTO caso_teste SET ?', insereDados, function (err, result) {
        if (err) {
            req.flash('error', err.message)
            // renderizar página inserir.ejs
            res.render('metrica/casotesteInserir.ejs', {
                iddados: parseInt(insereDados.iddados),
                id_ct: parseInt(insereDados.id_ct)
            })
        } else {
            console.log(result.insertId);
            req.flash('success', 'Inserido com sucesso');
            res.redirect('/casoteste/adicionar');
        }
    });
});

module.exports = router;