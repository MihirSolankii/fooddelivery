import React, { useContext, useState } from 'react'
import'./FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
function FoodItem({id,name,price,description,image}) {
  const[itemcount,setitemcount]=useState(0);
 const{cartitem,addtocart,removecart} =useContext(StoreContext);

  return (
    <div className='fooditem'>
      <div className='fooditem-img-container'>
      <img src={`http://localhost:4000/images/${image}`} className='food-item-img' alt='Food Item'/>
        {!cartitem[id]
          ?<img className='add' onClick={()=>addtocart(id)} src={assets.add_icon_white}/>
          :<div className='food-item-counter'>
            <img onClick={()=>removecart(id)} src={assets.remove_icon_red} alt=''/>
            <p>{cartitem[id]}</p>
            <img onClick={()=>addtocart(id)} src={assets.add_icon_green} alt=''/>
          </div>
        }
          
        
      </div>
      <div className='fooditem-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts}/>

        </div>
        <p className='food-item-desc'>
          {description}
        </p>
        <p className='food-item-price'>
            ${price}
        </p>
      </div>
    </div>
  )
}

export default FoodItem
