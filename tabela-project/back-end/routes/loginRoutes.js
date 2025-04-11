const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const autenticar = require('../middlewares/autenticacao')


router.post('/login',loginController.login);

//rota protegida 
router.get('/perfil',autenticar,(req,res)=> {
    res.json({usuario: req.session.usuario})
})

