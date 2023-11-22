const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const adminConfig = require("../config/admin.json");

const AdminModel = require("../models/Admin");

router.get("/users",(req,res)=>{
    console.log('controller');
    return res.json({});
});

module.exports = router;