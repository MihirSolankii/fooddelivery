import express from "express"
import authmiddleware from '../middleware/auth.js';
import { placeOrder, userOrders, verifyOrder } from "../controllers/ordercontroller.js";

const orderRouter=express.Router();

orderRouter.post("/place",authmiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/useorders",authmiddleware,userOrders)
export default orderRouter;