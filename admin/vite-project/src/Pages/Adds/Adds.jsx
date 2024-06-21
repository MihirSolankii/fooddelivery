import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './Adds.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function Adds() {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    try {
        const response = await axios.post("https://food-del-backend-vvhe.onrender.com/api/food/add", formData);
        if (response.data && response.data.success) {
          // Reset form data and image state
          setData({
            name: "",
            description: "",
            price: "",
            category: "Salad"
          });
          setImage(false);
          alert("Food item added successfully!");
        } else {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
              });
              setImage(false);
              message:"food Added"
              toast.success("Food Added")

              alert("Food item added successfully!");
        }
      } catch (error) {
        toast.error("Failed to Add food")
        console.error("Error adding food item:", error);
        alert("Failed to add food item. Please try again.");
      }
      
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='type here' required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='write content here' />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" onChange={onChangeHandler} value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="PureVeg">Pure Veg</option>
              <option value="pasta">Pasta</option>
              <option value="noodles">Noodles</option>
            </select>
          </div>
          <div className="addprice flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='$20' />
          </div>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Adds;
