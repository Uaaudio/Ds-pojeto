const express = require ('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

// rota p/ cadastrar um novo usuário
router.post('/cadastro', usuarioController.cadastrarUsuario);

module.exports = router;

