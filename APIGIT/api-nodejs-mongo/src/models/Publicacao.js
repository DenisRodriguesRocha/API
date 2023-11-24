const mongoose = require("../database/index");


const PublicacaoSchema = new mongoose.Schema({
    id: {type: String},
    titulo: {type: String, required: true},
    categoria: {type: String, required: true},
    conteudo: {type: String, required: true},
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', require: true},
    dataCriacao: {type: Date, default: Date.now}
});

const Publicacao = mongoose.model("Publicacao",PublicacaoSchema);

module.exports = Publicacao;