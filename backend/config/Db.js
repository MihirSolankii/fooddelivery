import mongoose from 'mongoose';

 export const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://mihir:92201703191@cluster0.b0v4j8c.mongodb.net/food-del");
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};


