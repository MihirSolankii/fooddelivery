import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets';
import {useNavigate} from "react-router-dom"
import './Cart.css'
function Cart() {
  const{food_list,
    cartitem,
    setcartitem,
    addtocart,
    removecart,
    getTotalcart}=useContext(StoreContext);
  const navigate=useNavigate();
  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Item</p>
          <p>title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>total</p>
          <p>Remove</p>

        </div>
        <br/>
       <hr/>
        {
  food_list.map((item, index) => {
    if (cartitem[item._id] > 0) {
      return (
        <div key={index} className='cart-items-title cart-items-item'>
          <img src={`http://localhost:4000/images/${item.image}`} alt="Food Item" />
          <p>{item.name}</p>
          <p>${item.price}</p>
          <p>{cartitem[item._id]}</p>
          <p>${item.price * cartitem[item._id]}</p>
          <h6 onClick={() => removecart(item._id)} src={assets.remove_icon_red} alt=''>Remove</h6>
        </div>
      );
    }
    return null; 
  })
 
}

<hr/>
      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalcart()}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <p>Deliver fee</p>
              <p>${getTotalcart()===0?0:2}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <div>Total</div>
            <div>${getTotalcart()===0?0:getTotalcart()+2}</div>
            </div>
            <hr/>
          </div>
          <button onClick={()=>navigate("/order")}>Proceed to Checkout</button>
          <hr/>
        </div>
        <div className='cart-promocode'>
           <div>
            <p>If you have a Promocode Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promocode'/>
              <button> Submit</button>
            </div>
           </div>
          </div>
      </div>
    </div>
   
  )
}

export default Cart
