import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const [data, setData] = useState([]);
    const { token } = useContext(StoreContext);
  
    const fetchOrders = async () => {
      try {
        const response = await axios.post("https://food-del-backend-vvhe.onrender.com/api/order/useorders", {}, { headers: { token } });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    useEffect(() => {
      if (token) {
        fetchOrders();
      }
    }, [token]);
  
    const lastOrder = data.orders && data.orders[data.orders.length -1];
  
    return (
      <div className="myorders">
        <h2>My Orders</h2>
        <div className="container">
          <p>{data.message}</p>
          <div className="orders">
            {lastOrder && (
              <div key={lastOrder._id} className="order">
                <div className="order-header">
                  <img src={assets.parcel_icon} alt="Parcel Icon" />
                 
                  <p>Status: {lastOrder.status}</p>
                </div>
                <div className="order-items">
                  {lastOrder.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <p>Item Name: {item.name}</p>
                      <p>Item Quantity: {item.quantity}</p>
                      {/* Add more details of the order item if needed */}
                    </div>
                  ))}
                </div>
                <div className="order-footer">
                  <p>Order Amount: ${lastOrder.amount}</p>
                  <p>Order Items Length: {lastOrder.items.length}</p>
                  {/* Add more details of the order if needed */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

export default MyOrders;
