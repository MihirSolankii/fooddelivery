import jwt from 'jsonwebtoken';
const authmiddleware=async(req,res,next)=>{
 const {token}=req.headers;
 if(!token){
    return res.status(401).json({message:"unauthorized user"})
 }
 try{
    const token_decode=jwt.verify(token,process.env.JWT_SECRET);
  req.body.userId=token_decode.id;
  next();
 }
 catch(error){
 console.log(error);
 res.status(401).json({message:"unauthorized user"})
 }
 
 
}
export default authmiddleware