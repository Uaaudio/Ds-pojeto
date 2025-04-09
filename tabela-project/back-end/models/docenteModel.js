const connection = require('../config/db')

exports.getAll = (callback) => {
    connection.query('SELECT * FROM docentes', callback);

};

exports.create = (nome, area, email, callback) => {
    const query = 'INSERT INTO docentes VALUES (?, ?, ?)';
    connection.query(query, [nome, area, email], callback);
}