import mongoose from "mongoose"
const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Object,required:true},
    amount:{type:Number,required:true},
    address:{type:String,required:true},
    status:{type:String,required:true,default:"Food Processing"},
    date:{type:Date,required:true,default:Date.now()},
    payment:{type:Boolean,default:false}
    
})

const OrderModel=mongoose.model.order||mongoose.model("Order",orderSchema)
export default OrderModel;
