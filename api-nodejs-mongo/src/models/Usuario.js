const mongoose = require('../database/index');

const bcryptjs = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nome:{type: String, required: true},
    email:{type: String, required: true, unique: true, lowercase: true},
    senha:{type: String, required: true, select: false},
    dataCriacao:{type: Date, default: Date.now}
});

UsuarioSchema.pre("save",async function(next){
    const hash = await bcryptjs.hash(this.senha,10);
    this.senha = hash;
});

const Usuario = mongoose.model("Usuario",UsuarioSchema);

module.exports = Usuario;