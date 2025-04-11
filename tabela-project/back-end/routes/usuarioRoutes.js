const express = require ('express');
const usuarioController = require('../controllers/usuarioController');
const middleware = require ('../middlewares/validarDadosCadastro')
const router = express.Router();


// rota p/ cadastrar um novo usuário
router.post('/cadastro', middleware.validarDadosCadastro,usuarioController.cadastrarUsuario);



module.exports = router;

