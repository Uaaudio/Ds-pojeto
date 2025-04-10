const mysql = require('mysql2/promise');

//criando conexao MySQL

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: '88275369',
    database:'horarios_docentes',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// criando pool de conexoes
const pool = mysql.createPool(config)

//funcao para testar a conexao
async function testConnection(){
    try{
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database!')
        connection.release(); //libera conexao de volta para o pool
        return true;
    }
    catch (error){
        console.error('Error connecting to MySQL database:', error);
        return false;
    }
}

//testar a conexao ao iniciar pool
testConnection();

// instanciando o objeto connection

module.exports = pool;