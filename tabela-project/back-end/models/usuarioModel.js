const db = require('../config/db');
const bcrypt = require('bcrypt')

exports.buscarPorEmail = async (email) => {
    try{
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0] || null;
    } catch (error){
        console.error('Erro ao buscar usuario por email:', error)
        throw error
    }   
}

exports.verificarPrimeiroUsuario = async () => {
    try {
        const [rows] = await db.query('SELECT COUNT(*) as total from usuarios');
        return rows[0].total === 0;
    }
    catch (error) {
        console.error('Erro ao verificar usuarios:', error);
        throw error;
    }
}
exports.cadastrar = async (nome, email, senha, nivel_acesso) => {
    try {
        //verifica se eh o primeiro usuario
        const isPrimeiroUsuario = await this.verificarPrimeiroUsuario();

        const nivelFinal = isPrimeiroUsuario ? 'coordenador' : 'professor';

        //criiptografando senha
        const hash = await bcrypt.hash(senha, 10);

        //inserindo no banco de dados 
        const [result] = await db.query(
            'INSERT INTO usuarios (nome, email, senha, nivel_acesso) VALUES (?,?,?,?)',
            [nome, email, hash, nivelFinal]
        );
        return {
            success: true,
            userId: result.insertId,
            nivel_acesso: nivelFinal,
            isFirstUser: isPrimeiroUsuario
        };

    } catch (error) {
        console.error('Erro ao cadastrar usuario', error);

        //Tratamento especifico para email duplicado
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('Este email ja esta cadastrado')
        }
    } throw error
}