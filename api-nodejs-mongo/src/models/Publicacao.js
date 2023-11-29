import mongoose from "mongoose";


const Publicacao = mongoose.model( 'Publicacao', {
    idPublicacao: {type: String},
    titulo: {type: String, required: true},
    conteudo: {type: String, required: true},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', require: true}
  })

export default Publicacao;