import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to="/add" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>add itmes</p>
            </NavLink>
            <NavLink to="/list" className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>list itmes</p>
            </NavLink>
            <NavLink to="/order" className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>orders itmes</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
