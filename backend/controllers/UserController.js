import userModel from "../models/usermodel.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from "validator"

// Login userModel
export const loginuser = async (req, res) => {
    const{email,password}=req.body;
    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({message:"invalid credentials"});
        }
        const token=generatetoken(user._id);
        // res.status(200).json({user,token});
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"failed to login"});
    }
}
 const generatetoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
 }
// Register user
export const registeruser = async (req, res) => {
    const{name,email,password}=req.body;
    try {
        const exist=await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:'User Already exists'})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Please enter a valid emial'})
        }
        if(password.length<8){
            return res.json({success:false,message:'please enter a valid password'})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
         const newuser=await userModel.create({name,email,password:hashedpassword});
        // const newUser =new User({name,email,password:hashedpassword})
        // res.status(201).json({message:"user created"});
        const  user=await newuser.save();
        const token=generatetoken(user._id);
       return res.json({success:true,token})
    } catch (error) {
        return   res.json({success:false,message:'Error'})
    }
}
