import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/auth";
import axios from "axios";
import { Card, CardMedia } from "@mui/material";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [checkedOrders, setCheckedOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/auth/all-orders`
      );
      setOrders(data);
      const storedCheckedOrders =
        JSON.parse(localStorage.getItem("checkedOrders")) || [];
      setCheckedOrders(storedCheckedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    const interval = setInterval(getOrders, 30000);
    return () => clearInterval(interval);
  }, [auth?.token]);

  const handleCheckboxChange = (orderNo) => {
    const updatedCheckedOrders = checkedOrders.includes(orderNo)
      ? checkedOrders.filter((order) => order !== orderNo)
      : [...checkedOrders, orderNo];
    setCheckedOrders(updatedCheckedOrders);
    localStorage.setItem("checkedOrders", JSON.stringify(updatedCheckedOrders));
  };

  return (
    <div>
      <h1 className="text-center font-extrabold">Orders</h1>
      <hr />
      <div className="grid place-items-center">
        {orders.map((o, i) => (
          <div
            key={i}
            className="border border-gray-300 rounded-lg p-5 m-5 overflow-x-auto"
          >
            <table className="table-auto max-h-full">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">Order No</th>
                  <th className="border border-gray-300 px-4 py-2">Items</th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="checkbox"
                      checked={checkedOrders.includes(o?.orderNo)}
                      onChange={() => handleCheckboxChange(o?.orderNo)}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center w-1/5">
                    {o?.orderNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 w-2/5">
                    {Object.entries(
                      o?.items.reduce((acc, curr) => {
                        acc[curr] = (acc[curr] || 0) + 1;
                        return acc;
                      }, {})
                    ).map(([item, count], index, array) => (
                      <span key={item}>
                        <h2>{item}</h2>
                        {count > 1 && <span>({count})</span>}
                        {index !== array.length - 1 && "  "}
                      </span>
                    ))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center w-1/5">
                    {o?.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center w-1/5">
                    ${o?.totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrder;
