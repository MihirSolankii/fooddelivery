import express from 'express';
import { addtocart,removecart,getcart } from '../controllers/cartcontroller.js';
import authmiddleware from '../middleware/auth.js';

const cartRouter=express.Router();

cartRouter.post("/add",authmiddleware,addtocart);
cartRouter.post("/remove",authmiddleware,removecart);
cartRouter.post("/get",authmiddleware,getcart)

export default cartRouter