import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css'
function List() {
  const [list, setList] = useState([]);
  const url = "http://localhost:4000"; // Define the url variable

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      
      if (response.data.success) {
        setList(response.data.data);
      } else {
        setList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      setList([]);
      toast.error("Error fetching list. Please try again later.");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);
  const removefood=async(foodid)=>{
   console.log(foodid);
   const response=await axios.post(`http://localhost:4000/api/food/remove`,{id:foodid});
    if(response.success){
      toast.success("food deleted sucessfully");
    }
    else{
      await fetchList();
      toast.success("food deleted sucessfully");
    }
       
  }

  return (
    <div className='list add flex-col'>
      <p>All Foods list</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
          </div>
          {
            list.map((item,index)=>{
              return(
                <div className="list-table-format" key={index}>
                  <img src={`http://localhost:4000/images/`+item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <button onClick={()=>removefood(item._id)}>Remove</button>
                </div>
              )
            })
          }
        
      </div>
    </div>
  );
}

export default List;
