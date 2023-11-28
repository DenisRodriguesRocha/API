import mongoose from "mongoose";

const Admin = mongoose.model('Admin', {
  nome: String,
  email: String,
  senha: String,
  biografia: String,
})

export default Admin;
