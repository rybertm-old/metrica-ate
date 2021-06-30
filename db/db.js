var mysql = require('mysql');

var conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'empresa',
    multipleStatements: true,
});
// TODO: Conectar a banco
// conexao.connect();

module.exports = conexao;