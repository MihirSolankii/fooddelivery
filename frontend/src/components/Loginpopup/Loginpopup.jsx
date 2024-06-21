import React, { useContext, useState } from 'react';
import './Loginpopup.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';


function Loginpopup({ setshowlogin }) {
    const { token, settoken } = useContext(StoreContext);
    const [state, setstate] = useState("Login");
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onchangehandler = (event) => {
        const { name, value } = event.target;
        setdata(prevData => ({ ...prevData, [name]: value }));
    }

    const onLogin = async (event) => {
      event.preventDefault();
      var apiUrl=""
      if (state === "Login") {
        apiUrl+= "http://localhost:4000/api/user/login";
      } else {
          apiUrl+= "http://localhost:4000/api/user/register";
      }

      const response=await axios.post(apiUrl,data);
      console.log(response);
      console.log(response.data.success);
      if(response.data.success){
        settoken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setshowlogin(false);
        console.log(response);
        
      }
      else{
        alert(response.data.message);
      }
    
    //   try {
    //     const response = await fetch(apiUrl, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //     });
    //  console.log(response);
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok.');
    //     }
    
    //     const responseData = await response.json();
    //     if (responseData.token) {
    //       settoken(responseData.token);
    //       localStorage.setItem("token", responseData.token);
    //       setshowlogin(false);
    //     } else {
    //       alert(responseData.message);
    //     }
    //   } catch (error) {
    //     alert(`Error: ${error.message}`);
    //   }
     };
    

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{state}</h2>
                    <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt="close" />
                </div>
                <div className='login-popup-input'>
                    {state === "Sign Up" && <input type='text' name='name' onChange={onchangehandler} value={data.name} placeholder='Your Name' required />}
                    <input type='email' name='email' onChange={onchangehandler} value={data.email} placeholder='Your Email' required />
                    <input type='password' name='password' onChange={onchangehandler} value={data.password} placeholder='Your Password' required />
                </div>
                <button type='submit'>{state === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type='checkbox' />
                    <p>By Continuing, I agree to the terms of use & privacy setting</p>
                </div>
                {state === "Login" ? <p>Create a new Account? <span onClick={() => setstate("Sign Up")}>Click Here</span></p> : <p>Already Have An Account? <span onClick={() => setstate("Login")}>Login Here</span></p>}
            </form>
        </div>
    );
}

export default Loginpopup;
