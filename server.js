const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const app = express();


// middleware para parsear JSON
app.use(express.json());

// usar as rotas de usuario
app.use('/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> {
    console.log(`Server is running on http://localhost:${PORT}`);

});