import jwt from 'jsonwebtoken';
const authmiddleware=async(req,res,next)=>{
 const {token}=req.headers;
 if(!token){
    return res.json({success:false,message:"not authorized Login Again"});
 }
 try{
    const token_decode=jwt.verify(token,process.env.JWT_SECRET);
  req.body.userId=token_decode.id;
  console.log(req.body.userId);
  next();
 }
 catch(error){
 console.log(error);
  return res.json({success:false,message:"not authorized Login Again"})
 }
 
 
}
export default authmiddleware