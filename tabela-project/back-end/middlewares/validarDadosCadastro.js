const validarDadosCadastro = (req, res, next) => {
    const { nome, email, senha } = req.body;
    
    if (!nome || !email || !senha) {
        return res.status(400).json({
            success: false,
            error: 'Nome, email e senha são obrigatórios!'
        });
    }
    
    // Validação simples de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            success: false,
            error: 'Formato de email inválido!'
        });
    }
    
    next();
};
module.exports = { validarDadosCadastro };
