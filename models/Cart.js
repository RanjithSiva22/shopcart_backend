var mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    // user_id:{
    //     type:String,
    //     required:true,
    // },
    num:{
        type:Number,
        required:true,    
    },
    cart:{
        type:Array,
        required:true,
    },
    total:{
        type:Number,
        required:true,    
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Cart',cartSchema);