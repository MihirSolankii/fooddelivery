import Food from "../models/foodmodel.js";
import fs from 'fs';


export const addfood = async (req, res) => {
  let image_filename=`${req.file.filename}`;
  const food = new Food({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image:image_filename,
    category:req.body.category
  })  
  try{
    await food.save();
    res.json({sucess:true,message:"food added"})
  }
  catch(error)
{
  console.log(error);
  res.json({sucess:false,message:"food not added"})
}
}
//all food list
export const listfood=async(req,res)=>{
  try{
    const food=await Food.find({});
    res.json({sucess:true,data:food})
  }
  catch(error){
    console.log(error);
    res.json({sucess:false,message:"food not found"})
  }
}
export const removefood =async(req,res)=>{
    try {
        const food = await Food.findById(req.body.id);
        if (!food) {
          throw new Error("Food item not found");
        }
      
        // Delete the associated image file
        fs.unlinkSync(`./uploads/${food.image}`);
      
        // Delete the food item from the database
        await Food.findByIdAndDelete(req.body.id);
        
        res.json({ success: true, message: "Food deleted" });
      } catch (error) {
        console.error("Error deleting food:", error);
        res.status(500).json({ success: false, message: "Failed to delete food" });
      }
      
}
