import mongoose from "mongoose";

const Usuario = mongoose.model('Usuario', {
  nome: String,
  email: String,
  senha: String,
  biografia: String,
})

export default Usuario;

