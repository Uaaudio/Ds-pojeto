function autenticar(req, res, next){
    if (req.session.usuario){
        next();
    }
    else {
        res.status(401).json({error: 'Usuário não autenticado.'})
    }
}

module.exports = autenticar