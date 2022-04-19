var express = require('express');
var app = express();
var authrouter=require('./routes/auth');
var postrouter=require('./routes/posts');
var sortrouter=require('./routes/sort');
var cartrouter=require('./routes/cart');
var paymentrouter=require('./routes/payment');



var cors = require('cors');
var dotenv=require('dotenv');
var mongoose=require('mongoose');


dotenv.config();


mongoose.connect(process.env.db_con,{ useNewUrlParser: true,useUnifiedTopology: true },()=>{
   console.log("db connected....");
})
app.use(cors());

app.use(express.json());

app.get('/', function (req, res) {
   console.log('hlo');
   res.send("Hello world!");
});
// app.post('/cart',(req,res)=>{
//    console.log(req.body);
//    res.send("cartsaved");
// });
app.use('/',authrouter);
app.use('/posts',postrouter);
app.use('/sort',sortrouter);
app.use('/cart',cartrouter);
app.use('/payment',paymentrouter);





app.listen(1000, () => console.log("Server started"));