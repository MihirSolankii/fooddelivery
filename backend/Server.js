import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/Db.js';
import foodrouter from './routes/foodroutes.js';
import userRouter from './routes/userroutes.js';
import 'dotenv/config'
import cartRouter from './routes/cartroutes.js';
import orderRouter from './routes/orderroutes.js';
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

//db connection
connectToDatabase();
 //api end point 
 app.use("/api/food",foodrouter);
 app.use("/images",express.static('uploads'))
 app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)
app.get("/", (req, res) => {
  res.send("api working");
});

app.listen(port, () => {
  console.log("server is running");
});
//mongodb+srv://mihir:92201703191@cluster0.b0v4j8c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


