var express=require('express');
const User = require('../models/User');
var router=express.Router();
var tokenauth=require('./verifyToken');

router.get('/',tokenauth,(req,res)=>{
    res.json({
        post:{
            msg:"its 2021",
        }
    });
})

router.get('/social',tokenauth,(req,res)=>{
    res.json({
        post:{
            msg:"its social",
        }
    });
})

router.get('/home',tokenauth,async(req,res)=>{
    const details= await User.findOne({email:req.header('email')});
    console.log(details);
    res.json(details);
})

module.exports=router;
