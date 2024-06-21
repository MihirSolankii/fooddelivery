import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'
function Header() {
  return (
    <div className='header'>
    <img src={assets.header_img}/>
      <div className='header-contents'>
        <h2>Order Your Favourite Food Here</h2>
        <p>choose from a  diverse menu featuring a delectable array of dishes crafted wit the finest ingredients and culinary expertise. our mission is to satisfy ypur cravings and elevate your dining experience,one delicious meal at a time</p>
        <button>View More</button>
      </div>
    </div>
  )
}

export default Header
