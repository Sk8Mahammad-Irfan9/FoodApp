import React, { useState, useEffect } from "react";
import "../css/checkout.css";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateHook } from "../store/cartStore";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "./context/Auth/auth";
import "../css/checkout.css";

const Checkout = () => {
  document.title = "Chekout";
  const { removeOneItemCart, addToCart, clearCart } = useStateHook();
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

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <>
        <div className="flex justify-center align-items-center text-2xl sm:max-h-max p-10 m-10">
          <code>You Dont Have any items Go To ->></code>
          <NavLink to="/menu" className="bg-orange-400">
            Menu
          </NavLink>
        </div>
      </>
    );
  }

  const checkout = async () => {
    const orderData = {
      items: cartItems.map((itemName) => itemName.title),
      totalPrice: totalPrice,
      quantity: cartItems.length,
      userEmail: auth?.user?.email,
      orderNo: auth?.user?.orderNo,
    };
    toast.loading("Please Wait!... Order details sending to your email");
    await axios
      .post("http://localhost:4000/api/create-order", orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then((response) => {
        const orderNumber = response.data.orderNo;
        toast.dismiss();
        clearCart();
        navigate("/");
        toast.success(`Order Placed ! Order Number : ${orderNumber}`);
      })
      .catch((err) => {
        console.log("error placing order", err);
      });
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="list-none">
        <li>
          <NavLink to="/menu" className="text-2xl">
            &larr; Go Back
          </NavLink>
        </li>
      </div>

      {!auth.user ? (
        <></>
      ) : (
        <>
          <div className="flex justify-around">
            <MenuItem value="">
              Hello : <em>{auth?.user?.name}</em>
            </MenuItem>
            <MenuItem value={20}>
              <NavLink onClick={handleLogout} className="logout">
                Log Out
              </NavLink>
            </MenuItem>
          </div>
        </>
      )}

      <div className="checkOuts">
        <ul>
          {cartItem.map((item) => (
            <li key={item.id}>
              <div key={item.id} className="checkout-products">
                <img
                  src={item.img}
                  style={{ height: "100px", width: "100px" }}
                  alt="..."
                />
                <div></div>
                <h3>{item.title}</h3>
                <span>${item.price}</span>
                <span>Sub Total -</span>
                <span>${item.count * item.price}</span>
                <span
                  onClick={() =>
                    useCartStore.getState().removefromcart(item.id)
                  }
                >
                  <RiDeleteBin6Line color="red" cursor="pointer" />
                </span>
              </div>
              <button className="add-item-list" onClick={() => addToCart(item)}>
                +
              </button>
              <span className="item-count">{item.count}</span>
              <button
                className="remove-item-list"
                onClick={() => removeOneItemCart(item)}
              >
                -
              </button>
            </li>
          ))}
        </ul>
      </div>

      <hr />
      <div className="text-center">
        {auth?.token ? (
          <>
            <div className="cart-totals">
              <h2>Cart Total</h2>
              <h4>Total Amount: ${totalPrice}</h4>
              <div>
                <button className="checkout-btn" onClick={checkout}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold m-8 rounded"
            onClick={() =>
              navigate("/login", {
                state: "/checkout",
              })
            }
          >
            Please register for Checkout
          </button>
        )}
      </div>
    </>
  );
};

export default Checkout;
