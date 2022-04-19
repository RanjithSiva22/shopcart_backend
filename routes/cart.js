var express=require('express');
const Cart = require('../models/Cart');
var router=express.Router();
var tokenauth=require('./verifyToken');

router.post('/api',tokenauth,async (req,res)=>{
       console.log(req.body);
       const {name,num,cartpds,tot}=req.body;
       const cart=new Cart({
              name:name,
              num:num,
              cart:cartpds,
              total:tot,

       });
       try{
              // console.log("initiating save command -------------------------");
              const savedCart= await cart.save();
              console.log(savedCart);
              // console.log("saved dacoments-------------------------------");
              return res.send("cartsaved");
      
              // console.log('returning -------------------------');
              // res.send("done");
          }catch(err){
              // console.log(err,"-------------------------error");
             return  res.status(400).json(err);
          }
       // res.send("cartsaved");
});

module.exports=router;
