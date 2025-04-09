const mysql = require('mysql2');

//criando conexao MySQL

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '88275369',
    database:'horarios_docentes'
});

//conectando MySQL com banco de dados
connection.connect((error)=>{
    if(error){
        console.error('Error connecting to MySQL database:', error)
    }else{
        console.log('Connected to MySQL database!')
    }
})

// instanciando o objeto connection

module.exports = connection;