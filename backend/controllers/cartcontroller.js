import User from '../models/usermodel.js'

   export const addtocart=async(req,res)=>{
 try {
    let userData=await  User.findOne({_id:req.body.userId})
    let cartData=await userData.cartData;
    if(!cartData[req.body.itemid])
        {
            cartData[req.body.itemid]=1
        }
        else{
            cartData[req.body.itemid]+=1
        }
        await User.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({sucess:true,message:"item added to cart"})
 } catch (error) {
    console.log(error);
    res.json({sucess:false,message:"item not added to cart"})
 }
}
 export  const removecart= async (req,res)=>{
    try {
        let userData=await User.findById(req.body.userId);
        let cartData= await userData.cartData;
        if(cartData[req.body.itemid]>0){
            cartData[req.body.itemid]-=1;
        }
            await User.findByIdAndUpdate(req.body.userId,{cartData});
            res.json({sucess:true,message:"item removed from cart"})
    
      } catch (error) {
        console.log(error);
        res.json({sucess:false,message:"item not removed from cart"})
      }
    
}
   export const getcart=async (req,res)=>{
    try{
        let userData=await User.findById(req.body.userId)
    let cartData=await userData.cartData;
    res.json({sucess:true,cartData})
    }
    catch(error){
        console.log(error);
        res.json({sucess:false,message:"error"})
    }
}

