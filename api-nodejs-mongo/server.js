const express = require('express');

const UsuariosController = require('./src/controller/UsuariosController');
const PublicacaoController = require('./src/controller/PublicacaoController');

const authenticateMiddleware = require('./src/middlewares/authenticate');

const app = express();
app.use(express.json());
app.use('/usuario',UsuariosController);
app.use('/admin',authenticateMiddleware,PublicacaoController);

app.listen(3000,()=>{
    console.log('Servidor rodando')
});