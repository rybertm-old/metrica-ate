var express = require('express');
var router = express.Router();
var dbConn = require('../db/db.js');


// ROTA PARA mostrar a pagina index.ejs, no evento da pasta raiz '/'
router.get('/', function (req, res, next) {
    dbConn.query('SELECT * FROM caso_teste p ORDER BY p.id_casoteste desc', function (err, queryTeste) {
        if (err) {
            req.flash('error', err.message);
            // preparar dados para página em views/metrica/index.ejs. 'metrica' é a pasta em view
            res.render('metrica/casoteste.ejs', { dataProduto: '' });
        } else {
            // preparar dados para página em views/editora/index.ejs
            res.render('metrica/casoteste.ejs', { dataProduto: queryTeste });
        }
    });
});

router.get('/adicionar', function (req, res, next) {
    var sql1 = 'SELECT id_o FROM programa_o';
    var sql2 = 'SELECT id_p FROM programa_p';
    dbConn.query(sql1, function (er, queryP) {
        if (er) {
            req.flash('error', er.message)
            res.render('metrica/casotesteInserir.ejs', {
                dataP: [],
                dataO: []
            })
        }
        dbConn.query(sql2, function (err, queryO) {
            if (err) {
                req.flash('error', err.message)
                res.render('metrica/casotesteInserir.ejs', {
                    dataP: [],
                    dataO: []
                })
            }
            res.render('metrica/casotesteInserir.ejs', {
                dataP: queryP,
                dataO: queryO
            });

        });
    });
});

router.post('/adicionar', function (req, res, _) {    //'/adicionar' é o caminho indicado em inserir.ejs
    let idprogramap = req.body.idprogramap;
    let idprogramao = req.body.idprogramao;

    var insereDados = {
        idprogramap: idprogramap,
        idprogramao: idprogramao
    }

    // ROTA PARA INSERIR REGISTRO
    dbConn.query('INSERT INTO caso_teste SET ?', insereDados, function (err, result) {
        if (err) { //if(err) throw err
            req.flash('error', err.message)
            // renderizar página inserir.ejs
            res.render('metrica/casotesteInserir.ejs', {
                idprogramap: parseInt(insereDados.idprogramap),
                idprogramao: parseInt(insereDados.idprogramao)
            })
        } else {
            console.log(result.insertId);
            req.flash('success', 'Inserido com sucesso');
            res.redirect('/casoteste/adicionar');
        }
    });
});

// rota (post) para atualizar livros
router.post('/casoteste/atualizar/:IdCasoTeste', function (req, res, next) {
    let IdCasoTeste = req.params.IdCasoTeste;
    let IdProgramaO = req.body.IdProgramaO;
    let IdProgramaP = req.body.IdProgramaP;
    let errors = false;
    if (!errors) {
        var editaDados = {
            IdProgramaO: IdProgramaO,
            IdProgramaP: IdProgramaP
        }
        // update query
        dbConn.query('UPDATE caso_teste SET ? WHERE id_casoteste = ' + IdCasoTeste,
            editaDados, function (err, result) {
                if (err) {
                    req.flash('error', err)
                    // render para editar.ejs com os mesmos dados
                    res.render('metrica/editar.ejs', {
                        IdCasoTeste: req.params.IdCasoTeste,
                        IdProgramaO: editaDados.IdProgramaO,
                        IdProgramaP: editaDados.IdProgramaP
                    })
                } else {
                    req.flash('success', 'Produto atualizado com sucesso');
                    res.redirect('/casoteste');
                }
            })
    }
})



module.exports = router;