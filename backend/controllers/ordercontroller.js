import OrderModel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
    try {
        const newOrder = new OrderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await usermodel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }));
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode: "payment",
            success_url: `http://localhost:3000/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `http://localhost:3000/verify?success=false&orderId=${newOrder._id}`
        });
        res.json({ success: true, session_url: session.url });
    } catch (error) { 
        console.log(error);
        res.json({ success: false, message: "error" });
    }

};
export const verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body;
    
   try {
    if(orderId==orderId){
        await OrderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"paid"})
    }
    else{
        await OrderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"notpaid"})
    }
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
   }
}
export const userOrders=async(req,res)=>{
    try {
        const orders=await OrderModel.find({userId:req.body.userId});
        res.json({success:true,orders})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}
