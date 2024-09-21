import React, { useState, useEffect } from "react";
import "../css/checkout.css";
import { useNavigate, NavLink } from "react-router-dom";
import useCartStore from "../store/cartStore";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "./context/Auth/auth";
import toast from "react-hot-toast";
import MenuItem from "@mui/material/MenuItem";

const Checkout = () => {
  document.title = "Checkout";

  const { removeOneItemCart, addToCart, clearCart } = useCartStore();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const cartItems = useCartStore((state) => state.cartItems);
  const [cartItem, setCartItems] = useState([]);

  useEffect(() => {
    const grouped = groupAndCountObjects(cartItems);
    setCartItems(grouped);
  }, [cartItems]);

  function groupAndCountObjects(array) {
    const groupedObjects = {};
    array.forEach((item) => {
      const key = JSON.stringify(item.title);
      if (!groupedObjects[key]) {
        groupedObjects[key] = { ...item, count: 1 };
      } else {
        groupedObjects[key].count++;
      }
    });
    return Object.values(groupedObjects);
  }

  const totalPrice = cartItem.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center text-2xl sm:max-h-max p-10 m-10">
        <code>You don't have any items. Go to ->></code>
        <NavLink to="/menu" className="bg-orange-400 p-2 rounded ml-2">
          Menu
        </NavLink>
      </div>
    );
  }

  const checkout = async () => {
    const orderData = {
      items: cartItems.map((item) => item.title),
      totalPrice,
      quantity: cartItems.length,
      userEmail: auth?.user?.email,
      orderNo: auth?.user?.orderNo,
    };

    toast.loading("Please Wait! Order details sending to your email...");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/create-order`,
        orderData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const orderNumber = response.data.orderNo;
      toast.dismiss();
      clearCart();
      navigate("/");
      toast.success(`Order Placed! Order Number: ${orderNumber}`);
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="list-none">
        <li>
          <NavLink to="/menu" className="text-2xl text-black">
            &larr; Go Back
          </NavLink>
        </li>
      </div>

      {auth.user && (
        <div className="flex justify-between items-center mb-2 text-white p-2 bg-gray-700 ">
          <MenuItem value="">
            Hello: <em>{auth?.user?.name}</em>
          </MenuItem>
          <MenuItem value={20}>
            <NavLink
              onClick={handleLogout}
              className="logout text-red-400 hover:text-red-300"
            >
              Log Out
            </NavLink>
          </MenuItem>
        </div>
      )}

      <div className="checkOuts p-4 bg-gray-800 shadow-lg">
        <ul className="list-none">
          {cartItem.map((item) => (
            <li key={item.id} className="mb-4">
              <div className="checkout-products bg-gray-700 p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-24 w-24 object-cover rounded-md"
                  />
                  <div className="ml-4 text-left">
                    <h3 className="text-white font-semibold">{item.title}</h3>
                  </div>
                </div>
                <div className="text-white text-center mx-4">
                  <span className="block">${item.price.toFixed(2)}</span>
                  <span className="text-gray-500">Per Unit</span>
                </div>
                <div className="text-white text-center mx-4">
                  <span className="block">
                    ${(item.count * item.price).toFixed(2)}
                  </span>
                  <span className="text-gray-500">Subtotal</span>
                </div>
                <span
                  onClick={() =>
                    useCartStore.getState().removefromcart(item.id)
                  }
                  className="text-red-500 cursor-pointer hover:text-red-300"
                >
                  <RiDeleteBin6Line size={24} />
                </span>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  className="add-item-list rounded-full"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
                <span className="item-count mx-4 text-lg">{item.count}</span>
                <button
                  className="remove-item-list rounded-full"
                  onClick={() => removeOneItemCart(item)}
                >
                  -
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-4 border-gray-600" />

      <div className="text-center">
        {auth?.token ? (
          <div className="cart-totals text-white mb-4">
            <h2 className="text-lg font-bold">Cart Summary</h2>
            <h4 className="text-xl">
              Total Products:{" "}
              {cartItem.reduce((acc, item) => acc + item.count, 0)}
            </h4>
            <h4 className="text-xl">Total Amount: ${totalPrice.toFixed(2)}</h4>
            <button
              className="checkout-btn bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition duration-300"
              onClick={checkout}
            >
              Checkout
            </button>
          </div>
        ) : (
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold m-8 rounded-lg py-2 px-4 transition duration-300"
            onClick={() => navigate("/login", { state: "/checkout" })}
          >
            Please register for Checkout
          </button>
        )}
      </div>
    </>
  );
};

export default Checkout;
