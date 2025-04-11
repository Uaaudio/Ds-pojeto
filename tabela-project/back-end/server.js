const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const app = express();
const cors = require('cors');
const session = require('express-session');


app.use(session({
    secret: 'segredoParaAlterar',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))

app.use(cors())

// middleware para parsear JSON
app.use(express.json());

// usar as rotas de usuario
app.use('/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> {
    console.log(`Server is running on http://localhost:${PORT}`);

});