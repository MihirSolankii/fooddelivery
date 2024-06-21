import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './PlaceOrder.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { food_list, cartitem, getTotalcart, token } = useContext(StoreContext);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let ordeItems = [];
    food_list.map((item) => {
      if (cartitem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartitem[item._id];
        ordeItems.push(itemInfo);
      }
    });

    let orderData = {
      address: JSON.stringify(data),
      items: ordeItems,
      amount: getTotalcart() + 2
    };

    let response = await axios.post("https://food-del-backend-vvhe.onrender.com/api/order/place", orderData, { headers: { token } });
    if (response.status === 200) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    if (!token) {
        toast.warning("please login to continue")
      navigate("/cart");
    } else if (getTotalcart() === 0) {
     toast.warning("please fill the cart")
      navigate("/cart");
    }
  }, [token, getTotalcart, navigate]);

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title"> Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name="firstname" onChange={onChangeHandler} value={data.firstname} placeholder="first name" />
          <input required name="lastname" onChange={onChangeHandler} value={data.lastname} type="text" placeholder="last name" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="type email address" />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="street" />
        <div className="multi-fields">
          <input required type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" />
          <input required type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="state" />
        </div>
        <div className="multi-fields">
          <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="zipcode" />
          <input required type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="country" />
        </div>
        <input required type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="phone" />
      </div>

      <div className="place-order-right">
        <p className="title">Order Summary</p>
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalcart()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalcart() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <div>Total</div>
              <div>${getTotalcart() === 0 ? 0 : getTotalcart() + 2}</div>
            </div>
            <hr />
          </div>
          <button type="submit">Proceed to payment</button>
          {(!token || getTotalcart() === 0) && (
            <div className="message">
              {(!token && "Please login to continue") || (getTotalcart() === 0 && "Please fill the cart")}
            </div>
          )}
          <hr />
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
