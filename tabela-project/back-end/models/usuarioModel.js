const db = require('../config/db');
const bcrypt = require('bcrypt')

exports.buscarPorEmail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0] || null;
    } catch (error) {
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

    const connection = db;

    //verifica se eh o primeiro usuario
    const isPrimeiroUsuario = await this.verificarPrimeiroUsuario();

    const nivelFinal = isPrimeiroUsuario ? 'coordenador' : 'docente';

    //criiptografando senha
    const hash = await bcrypt.hash(senha, 10);

    try {

        //inserindo no banco de dados 
        const [result] = await db.query(
            'INSERT INTO usuarios (nome, email, senha, nivel_acesso) VALUES (?,?,?,?)',
            [nome, email, hash, nivelFinal]
        );

        const userId = result.insertId;

        // se for DOCENTE, tambem cadastrar na tabela docente

        if (nivelFinal === 'docente') {
            const [docenteResult] = await connection.query(
                'INSERT INTO docente (nome, email) VALUES (?, ?)',
                [nome, email]
            );
            const docenteId = docenteResult.insertId;

            // atualizar usuario com o docenteId

            await connection.query(
                'UPDATE usuarios SET docente_id = ? WHERE id = ?',
                [docenteId, userId]
            );
        } else if (nivelFinal === 'coordenador') {
            // caso coordenador, cadastrar na tabela coordenadores
            const [coordResult] = await connection.query(
                'INSERT INTO coordenadores (nome,email) VALUES (?, ?)',
                [nome, email]
            )

            const coordenadorId = coordResult.insertId

            // atualizar usuario com coordenador_id
            await connection.query(
                'UPDATE usuarios SET coordenador_id = ? WHERE id = ?',
                [coordenadorId, userId]
            );

        }


        return {
            success: true,
            userId,
            nivel_acesso: nivelFinal,
            isFirstUser: isPrimeiroUsuario
        };

    } catch (error) {
        console.error('Erro ao cadastrar usuario', error);

        //Tratamento especifico para email duplicado
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('Este email ja esta cadastrado')
        }
    throw error} 
}