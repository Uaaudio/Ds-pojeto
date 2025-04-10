const usuarioModel = require('../models/usuarioModel');


// funcao de cadastro

exports.cadastrarUsuario = async (req,res) => {
    try{    const {nome, email, senha, nivel_acesso} =  req.body;
    
    //verificar se todos os campos foram preenchidos
     if(!nome || !email || !senha){
    return res.status(400).json({error: 'Todos os campos são obrigatórios!'})
}
    // verificar se o email já existe no banco de dados
    const usuarioExistente = await usuarioModel.buscarPorEmail(email);
    if (usuarioExistente){ return res.status(400).json({error: 'Este e-mail já foi cadastrado!'});
}


    // cadastrar usuario
    const resultado = await usuarioModel.cadastrar(
        nome,
        email,
        senha
    )

    // mensagem conforme tipo de usuario
    const message = resultado.isFirstUser
    ? ' Coordenador cadastrado com sucesso!'
    : 'Docente cadastrado com sucesso!';

    // resposta suscesso
    res.status(201).json({
        success: true,
        message,
        data:{
            id: resultado.userId,
            nome,
            email,
            nivel_acesso: resultado.nivel_acesso
        }
    });
}catch (error){
    console.error('Erro no cadastro:', error);
    //tratamento especifico para erros conhecidos
    if (error.message === 'Este email ja esta cadastrado'){
        return res.status(400).json({error: error.message});
    }
    //erro generico
    res.status(500).json({
        error: 'Erro interno no servidor',
        details: process.env.NODE_ENV === 'development' ? error.message: undefined
    });
} 
};