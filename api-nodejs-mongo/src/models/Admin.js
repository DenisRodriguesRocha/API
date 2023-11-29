import mongoose from "mongoose";

const Admin = mongoose.model('Admin', {
  nome: String,
  email: String,
  senha: String,
  biografia: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
})

export default Admin;
