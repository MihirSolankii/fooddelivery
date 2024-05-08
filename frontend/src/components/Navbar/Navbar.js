import React,{useContext, useState} from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

function Navbar({setshowlogin}) {
 
  const{token,settoken}=useContext(StoreContext);

    const[menu,setmenu]=useState("home");
    const navigate=useNavigate()
    const logout=()=>{
     localStorage.removeItem("token")
     settoken("");
    navigate("/")
    }
  return (
    
    <div className='navbar'>
       <Link to="/"> <img src={assets.logo} className='logo'/></Link> 
     
      <ul className='navbar-menu'>
        <Link to="/" onClick={()=>setmenu("home")}  className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setmenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#' onClick={()=>setmenu("mobileapp")} className={menu==="mobileapp"?"active":""}>MobileApp</a>
        <a href='#footer' onClick={()=>setmenu("contactus")}className={menu==="contactus"?"active":""}>Contact us </a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon}/>
        <div className='navbar-search-icon'>
          <Link to="/cart">
            <img src={assets.basket_icon}/></Link>
            <div className='dot'></div>
        </div>
        {!token?<button onClick={()=>setshowlogin(true)}>Signin</button>:<div className='navbar-profile'>
         <img src={assets.profile_icon}/>
         <ul className='nav-profile-dropdown'>
          <li onClick={()=>{navigate("/myorders")}}><img src={assets.bag_icon}/><p>Orders</p></li>
          <hr/>
          <li onClick={logout}><img src={assets.logout_icon}/>
          <p>Logout</p></li>
         </ul>
          </div>}
 
      </div>
    </div>
  )
}

export default Navbar
