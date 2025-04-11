 const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const {email, senha } = req.body;

    try{
        const usuario = await usuarioModel.buscarPorEmail(email);

        if (!usuario) {
            return res.status(401).json({error: 'Usuário não encontrado.'})
        }
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if(!senhaCorreta){
            return res.status(401).json({ error: 'Email ou senha inválidos'});
        }
    

    // armazena dados na sessao
    req.session.usuario = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        nivel_acesso: usuario.nivel_acesso
    };

    res.json({ message: 'Login realizado com sucesso', usuario: req.session.usuario})
}   catch (error){
    console.error('Erro no login:', error);
    res.status(500).json({error: 'Erro interno no servidor'})
}
}