var express=require('express');
// const User = require('../models/User');
var router=express.Router();
// var tokenauth=require('./verifyToken');
const fetch = require('node-fetch');

router.get('/all',async (req,res)=>{
    await fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        console.log(json)
        res.json(json);
    })
});



module.exports=router;
    // const pdata= await fetch('https://fakestoreapi.com/products');
    // console.log(pdata);
    // res.json(pdata);