var express=require('express');
// const Cart = require('../models/Cart');
var router=express.Router();
var tokenauth=require('./verifyToken');

router.post('/api',tokenauth,(req,res)=>{
    console.log(req.body);
    res.send("paymentsaved");
});

module.exports=router;
