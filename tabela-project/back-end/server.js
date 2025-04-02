const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
const app = express();

// habilitar CORS para todas as rotas e origens
app.use(cors());


// middleware para parsear JSON
app.use(express.json());

// usar as rotas de usuario
app.use('/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> {
    console.log(`Server is running on http://localhost:${PORT}`);

});