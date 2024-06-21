import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitem,setcartitem]=useState({});
  const[token,settoken]=useState("");
  const[food_list,setFoodlist]=useState([]);

  const addtocart= async(itemid)=>{
    if(!cartitem[itemid]){
      setcartitem((prev)=>({...prev,[itemid]:1}))
    }
    else{
      setcartitem((prev)=>({...prev,[itemid]:prev[itemid]+1}))
    }
    if(token){
      await axios.post("https://food-del-backend-vvhe.onrender.com/api/cart/add",{itemid},{headers:{token}});
    }
  }
  const removecart= async (itemid)=>{
    setcartitem((prev)=>({...prev,[itemid]:prev[itemid]-1}))
    if(token){
      await axios.post("https://food-del-backend-vvhe.onrender.com/api/cart/remove",{itemid},{headers:{token}});
    }
  }
 
 const getTotalcart=()=>{
  let totalamount=0;
  for (const items in cartitem) {
    if(cartitem[items]>0){
      let iteminfo=food_list.find((product)=>product._id===items)
      totalamount+=iteminfo.price*cartitem[items]
    }
   
  }
  return totalamount;
 }


  const fetchFoodlist=async()=>{
    const response=await axios.get("https://food-del-backend-vvhe.onrender.com/api/food/list");
    setFoodlist(response.data.data);
     console.log(response.data.data);
  
   }
 

 const loadcartdata=async(token)=>{
  const response=await axios.post("https://food-del-backend-vvhe.onrender.com/api/cart/get",{},{headers:{token}});

  setcartitem(response.data.cartData);
 }
 useEffect(()=>{
 async function loaddata(){
  await fetchFoodlist();
  if(localStorage.getItem("token")){
    settoken(localStorage.getItem("token"));
     await loadcartdata(localStorage.getItem("token"))
  }
 }
 loaddata();
 },[])


  const contextValue = {
   food_list,
   cartitem,
   setcartitem,
   addtocart,
   removecart,
   getTotalcart,
   token,
   settoken
  };
  
  


  return (
    <StoreContext.Provider value={contextValue}>
      {props.children} 
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
