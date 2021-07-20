var express = require('express');
var router = express.Router();
var dbConn = require('../db/db.js');
var c_uso = require('../metricas/c_uso')


function is_operador(variavel) {
  return variavel === "=" ||
    variavel === "+" ||
    variavel === "-" ||
    variavel === "*" ||
    variavel === "/" ||
    variavel === "%"
}

/* GET home page. */
router.get('/', function (req, res, next) {
  let query = "SELECT * FROM dados_tm; SELECT DISTINCT linha FROM dados_tm;";
  dbConn.query(query, function (err, querytm) {
    if (err) {
      req.flash('error', err.message);
      // preparar dados para página em views/metrica/index.ejs. 'metrica' é a pasta em view
      res.render('index', { datatm: '' });
    } else {
      // Vetor com todos valores distintos de linhas
      let linhas = querytm[1];
      // Total de linhas no programa P
      let totalLinhas = linhas.length;
      // Pega somente colunas com informacaoes validas para calculo de c_uso
      let dados_cuso = querytm[0].filter(dado => {
        if (dado.cod_linha.includes("if") ||
          dado.cod_linha.includes("while") ||
          dado.cod_linha.includes("for") ||
          dado.cod_linha.includes("switch")) {
          // Remove a linha invalida para calculo de c_uso
          linhas = linhas.filter(ln => ln.linha !== dado.linha);
          return false;
        }
        return true;
      });
      // Total de linhas do programa P que saoo validas para calculo de c_uso
      let totalLinhasCuso = linhas.length;
      // Vetor que contem um vetor de operandos para cada linha do programa P
      let operandos_cuso = [];
      // Vetor que contem um vetor de operadores para cada linha do programa P
      let operadores_cuso = [];
      // Vetor que contem um vetor de constantes para cada linha do programa P
      let constantes_cuso = [];
      for (let i = 1; i <= totalLinhasCuso; i++) {
        operandos_cuso.push([]);
        operadores_cuso.push([]);
        constantes_cuso.push([]);

        // Adiciona os valores dos operadores/operandos/constantes nos seus respectivos vetores, de acordo com sua linha
        dados_cuso.forEach(dado => {
          if (i === parseInt(dado.linha)) {
            if (is_operador(dado.variavel_p)) {
              operadores_cuso[i - 1].push(parseInt(dado.dado_hexa_p, 16));
            }
            else if (dado.variavel_p === "___CONSTANTE___") {
              constantes_cuso[i - 1].push(parseInt(dado.dado_hexa_p, 16));
            } else {
              operandos_cuso[i - 1].push(parseInt(dado.dado_hexa_p, 16));
            }
          }
        });
      }

      // Calcula c_uso
      let { cuso, cuso_parcelas } = c_uso(totalLinhasCuso, operandos_cuso, operadores_cuso, constantes_cuso);


  

      res.render('index', {
        datatm: querytm[0],
        totalLinhas,
        cuso,
        cuso_parcelas
      });
    }
  });
});



module.exports = router;
