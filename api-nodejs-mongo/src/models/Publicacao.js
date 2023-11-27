import mongoose from "mongoose";


const Publicacao = mongoose.model( 'Publicacao', {
    id: {type: String},
    titulo: {type: String, required: true},
    categoria: {type: String, required: true},
    conteudo: {type: String, required: true},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', require: true},
    dataCriacao: {type: Date, default: Date.now}
  })

export default Publicacao;