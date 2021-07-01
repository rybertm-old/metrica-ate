var express = require('express');
var router = express.Router();
var dbConn = require('../db/db.js');


// ROTA PARA mostrar a pagina index.ejs, no evento da pasta raiz '/'
router.get('/', function (req, res, next) {
    dbConn.query('SELECT * FROM programao', function (err, queryTeste) {
        if (err) {
            req.flash('error', err.message);
            // preparar dados para página em views/metrica/index.ejs. 'metrica' é a pasta em view
            res.render('metrica/programao.ejs', { dataProduto: '' });
        } else {
            // preparar dados para página em views/editora/index.ejs
            res.render('metrica/programao.ejs', { dataProduto: queryTeste });
        }
    });
});

router.get('/adicionar', function (req, res, next) {
    res.redirect('metrica/programaOInserir.ejs');
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
router.post('/programao/atualizar/:IdProgramao', function (req, res, next) {
    let idProgramao = req.params.IdProgramao;
    let dtCodificacao = req.body.dtCodificacao;
    let errors = false;

    if (!errors) {
        var editaDados = {
            dtCodificacao: dtCodificacao
        }
        // update query
        dbConn.query('UPDATE caso_teste SET ? WHERE idProgramao = ' + idProgramao,
            editaDados, function (err, result) {
                if (err) {
                    req.flash('error', err)
                    // render para editar.ejs com os mesmos dados
                    res.render('metrica/programaOEditar.ejs', {
                        idProgramao: req.params.IdProgramao,
                        dtCodificacao: editaDados.dtCodificacao
                    })
                } else {
                    req.flash('success', 'ProgramaO atualizado com sucesso');
                    res.redirect('/programao');
                }
            })
    }
})



module.exports = router;