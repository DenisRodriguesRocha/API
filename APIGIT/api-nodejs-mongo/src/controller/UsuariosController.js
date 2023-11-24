const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');


const UsuarioModel =  require('../models/Usuario');

const router = express.Router();

const generateToken = (usuario = {}) => {
    return jwt.sign({
        id: usuario.id,
        nome: usuario.nome
    }, authConfig.secret ,{
        expiresIn:86400
    });
}

router.post('/register', async(req,res)=>{

    const {email} = req.body;

    if(await UsuarioModel.findOne({email})){
        return res.status(400).json({
            error: true,
            message: 'Usuário já existe'
        })
    }

    const usuario = await UsuarioModel.create(req.body);

    usuario.senha = undefined;

    return res.json({
        usuario,
        token: generateToken(usuario)

    });
});

router.post('/authenticate', async(req,res)=>{

    const {email,senha} = req.body;

    const usuario = await UsuarioModel.findOne({email}).select("+senha");

    if(!usuario){
        return res.status(400).json({
            error: true,
            message: 'Usuário não encontrado'
        });
    };

    if(!await bcrypt.compare(senha,usuario.senha)){
        return res.status(400).send({
            error: true,
            message: 'Senha inválida'
        })
    };

    usuario.senha = undefined;

    return res.json({
        usuario,
        token: generateToken(usuario)
    });

});

module.exports = router;