const mongoose = require("../database/index");

const bcryptjs = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

AdminSchema.pre("save",async function(next){
    const hash = await bcryptjs.hash(this.password,10);
    this.password = hash;
});

const Admin = mongoose.model("Admin",AdminSchema);

module.exports = Admin;