var express = require('express');
var router = express.Router();
var dbConn = require('../db/db.js');


// ROTA PARA mostrar a pagina index.ejs, no evento da pasta raiz '/programao'
router.get('/', function (req, res, next) {
    dbConn.query('SELECT * FROM Programa_O', function (err, queryTeste) {
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
    res.render('metrica/programaOInserir.ejs', {
        dt_codificacao: '',
    });
});
//'/adicionar' é o caminho indicado em inserir.ejs
router.post('/adicionar', function (req, res, _) {    
    let dt_codificacao = req.body.dt_codificacao;

    var insereDados = {
        dt_codificacao: dt_codificacao
    }

    // ROTA PARA INSERIR Programa_O
    dbConn.query('INSERT INTO Programa_O SET ?', insereDados, function (err, result) {
        if (err) { //if(err) throw err
            req.flash('error', err.message)
            // renderizar página inserir.ejs
            res.render('metrica/programaOInserir.ejs', {
                dt_codificacao: insereDados.dt_codificacao,
            })
        } else {
            console.log(result.insertId);
            req.flash('success', 'Inserido com sucesso');
            res.redirect('/programa_o/adicionar');
        }
    });
});

// // rota (post) para atualizar livros
// router.post('/programao/atualizar/:IdProgramao', function (req, res, next) {
//     let idProgramao = req.params.IdProgramao;
//     let dt_codificacao = req.body.dt_codificacao;
//     let errors = false;

//     if (!errors) {
//         var editaDados = {
//             dt_codificacao: dt_codificacao
//         }
//         // update query
//         dbConn.query('UPDATE Programa_O SET ? WHERE idProgramao = ' + idProgramao,
//             editaDados, function (err, result) {
//                 if (err) {
//                     req.flash('error', err)
//                     // render para editar.ejs com os mesmos dados
//                     res.render('metrica/programaOEditar.ejs', {
//                         idProgramao: req.params.IdProgramao,
//                         dt_codificacao: editaDados.dt_codificacao
//                     })
//                 } else {
//                     req.flash('success', 'ProgramaO atualizado com sucesso');
//                     res.redirect('/programao');
//                 }
//             })
//     }
// })



module.exports = router;