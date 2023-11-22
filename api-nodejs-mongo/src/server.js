const express = require('express');

const AuthController = require('./controller/AuthController');
const AdminController = require('./controller/AdminController');

const authenticateMiddleware = require('./middlewares/authenticate');

const app = express();

app.use(express.json());

app.use('/auth',AuthController);
app.use('/admin',authenticateMiddleware,AdminController);

app.listen(3033,()=>{
    console.log('Servidor rodando')
});