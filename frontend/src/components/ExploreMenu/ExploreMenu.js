import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
function ExploreMenu({category,setCategory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>  
      <p className='explore-menu-text'>
      choose from a  diverse menu featuring a delectable array of dishes crafted wit the finest ingredients and culinary expertise. our mission is to satisfy ypur cravings and elevate your dining experience,one delicious meal at a time
      </p>
      <div className='explore-menu-list'>
      {
  menu_list.map((item,index)=> {
    return (
      <div onClick={()=>{setCategory(prev=>prev === item.menu_name ? "all" : item.menu_name) }}key={index} className='explore-menu-list-item'>
        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt={item.menu_name} />
        <p>{item.menu_name}</p>
      </div>
    );
  })
}
<hr/>
      </div>
    </div>
  )
}

export default ExploreMenu
