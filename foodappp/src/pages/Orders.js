import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [checkedOrders, setCheckedOrders] = useState(() => {
    const storedCheckedOrders = localStorage.getItem('checkedOrders');
    return storedCheckedOrders ? JSON.parse(storedCheckedOrders) : {};
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env}/getOrders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleCheckOrder = (orderId) => {
    setCheckedOrders((prevCheckedOrders) => {
      const updatedCheckedOrders = { ...prevCheckedOrders, [orderId]: true };
      localStorage.setItem('checkedOrders', JSON.stringify(updatedCheckedOrders));
      return updatedCheckedOrders;
    });
  };

  return (
    <div>
      <h2>Order List</h2>
      {orders.slice().reverse().map((order) => (
        <div
          key={order._id}
          className={`order-item ${checkedOrders[order._id] ? 'checked' : ''}`}
        >
          <p>Order Number: {order.orderNo}</p>
          <p>Items Name: {order.items.join(", ")}</p>
          <p>Total Price: ${order.totalPrice}</p>
          <p>Quantity: {order.quantity}</p>
          <label>
            <input
              type="checkbox"
              checked={checkedOrders[order._id] || false}
              onChange={() => handleCheckOrder(order._id)}
            />
            Mark as Checked
          </label>
        </div>
      ))}
    </div>
  );
};

export default Orders;
