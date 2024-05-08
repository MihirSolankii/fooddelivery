import React, { useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from "axios"
function Verify() {
    const[searchparams,setSearchparmas]=useSearchParams();
    const navigate=useNavigate();
    const sucess=searchparams.get("success");
    console.log(sucess);
    const orderId=searchparams.get("orderId");
    console.log(orderId);
    const verifyPayment = async () => {
        try {
          const response = await axios.post("http://localhost:4000/api/order/verify",{sucess,orderId});
          console.log(response.data.success);
          console.log(response.data);
          if (response.data.success) {
            navigate("/myorders");
          } else {
            navigate("/");
            
          }
        }   catch (error) {
                console.log(error.message); // Log the error message
                navigate("/"); // Redirect to the home page on error
              };
        
        
      };
    useEffect(()=>{
        verifyPayment()
    },[])
  return (
    <div className='verify'>
      a<div className='spinner'></div>
    </div>
  )
}

export default Verify
