const connection = require('../config/db');

exports.buscarPorEmail = (email, callback) => {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(query, [email], callback);
}

exports.cadastrar = (nome, email, senha, nivel_acesso, callback) => {
    const query = 'INSERT INTO usuarios (nome, email, senha, nivel_acesso) VALUES (?,?,?,?)';
    connection.query(query,[nome, email, senha, nivel_acesso], callback);

}