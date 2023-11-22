const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://sined:Dr20012004@cluster0.norqwlb.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        console.log('Conexão bem-sucedida ao MongoDB');
    })
    .catch((error)=>{
        console.error('Erro ao conectar com o MongoDB',error);
    })
mongoose.Promise = global.Promise;

module.exports = mongoose;

