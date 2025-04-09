const usuarioModel = require('../models/usuarioModel');
const bcrypt = require ('bcrypt');

// funcao de cadastro

exports.cadastrarUsuario = (req,res) => {
    const {nome, email, senha, nivel_acesso} =  req.body;

    //verificar se todos os campos foram preenchidos
    
    if(!nome || !email || !senha || !nivel_acesso){
        return res.status(400).json({error: 'Todos os campos são obrigatórios!'})
    }

    // verificar se o email já existe no banco de dados

    usuarioModel.buscarPorEmail(email, (err, result) => {
        if (err) {
            return res.status(500).json({error: 'Erro ao verificar o e-mail:'});
        }
        if (result.length > 0){
            return res.status(400).json({error: 'Este e-mail já foi cadastrado!'});
        }

    // criptografar a senha antes de salvar no banco
    bcrypt.hash(senha, 10, (err,hashedPassword) => {
        if (err){
            return res.status(500).json({error: 'Erro ao criptografar senha.'});
        }
    // inserir o novo usuário no banco de dados
    usuarioModel.cadastrar(nome, email, hashedPassword, nivel_acesso,(err, result) => {
        if (err){
            console.error('Erro ao cadastrar o usuário:', err) // exibe o erro detalhado
            return res.status(500).json({error: 'Erro ao cadastrar usuário.'});
        }
        
        res.status(201).json({message: 'Usuário cadastrado com sucesso!'});
    });
});
});
}