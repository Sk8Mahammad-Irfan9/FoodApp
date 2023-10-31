import React, { useState, useEffect } from "react";
import "../css/checkout.css";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateHook } from "../store/cartStore";

const Checkout = () => {
  document.title = "Chekout";
  // const { cartCount, addToCart, removeFromCart, resetCart } = useStateHook();
  const { removeOneItemCart, addToCart, clearCart } = useStateHook();
  const navigate = useNavigate();

  // const cartItems = useStateHook((state) => state.cartItems);
  const cartItems = useCartStore((state) => state.cartItems);
  // const removeFromCart = useCartStore((state) => state.removeFromCart);
  // const removeFromCart = useCartStore((state) => state.removeFromCart);

  // const handleRemoveItems = () => {
  //   removeFromCart(item.id);
  // };

  // const [itemNames, setItemNames] = useState("");

  // const cartCount = useCartStore((state) => state.cartItems);
  const [cartItem, setCartItems] = useState([]);

  useEffect(() => {
    const grouped = groupAndCountObjects(cartItems);
    setCartItems(grouped);
  }, [cartItems]);

  // const generateOrderNumber = () => {
  //   return Math.floor(1000 + Math.random() * 9000);
  // };

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
  // const calculateTotalPrice = (items) => {
  //   return items.reduce((total, item) => total + item.price * item.count, 0);
  // };

  if (cartItems.length === 0) {
    return <h1>Do Shopping</h1>;
  }

  // const checkout = async () => {
  //   try {
  //     const response = await createOrder({
  //       items: cartItems,
  //       totalAmount: totalPrice,
  //     });
  //     if (response) {
  //       alert(
  //         "Order created successfully, Order Code is : " +
  //           response.data.data.orderNo
  //       );
  //       clearCart();
  //       navigate("/");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const checkout = () => {
    // alert(generateOrderNumber());
    const orderData = {
      // orderNo: generateOrderNumber(),
      items: cartItems.map((itemName) => itemName.title),
      totalPrice: totalPrice,
      quantity: cartItems.length,
    };
    // const contentLength = JSON.stringify(orderData).length;
    axios
      .post("http://localhost:4000/api/create-order", orderData, {
        headers: {
          "Content-Type": "application/json",
          // "Content-Length": contentLength.toString(),
        },
      })
      .then((response) => {
        // console.log("dont get it");
        // alert(generateOrderNumber());
        alert(
          "Order created successfully, Order Code is : " + response.data.orderNo
        );
        // alert(generateOrderNumber())
        clearCart();
        navigate("/");
      })
      .catch((err) => {
        console.log("error placing order", err);
      });
  };

  // console.log(cartItems[0].id);

  return (
    <>
      <h1>Yo have {cartItems.length} items</h1>
      {/* <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
          {item.title}
          <img src={item.img} alt="..." />
          </li>
        ))}
      </ul> */}

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
                <span>₹{item.price}</span>
                <span>Sub Total -</span>
                <span>₹{item.count * item.price}</span>
                <span
                  onClick={() =>
                    useCartStore.getState().removefromcart(item.id)
                  }
                >
                  <RiDeleteBin6Line color="red" cursor="pointer" />
                </span>
              </div>
              <button className="add-item" onClick={() => addToCart(item)}>
                +
              </button>
              {/* <textarea>{item.count}</textarea> */}
              {/* <input value={item.count}/> */}
              <span>{item.count}</span>
              <button
                className="remove-item"
                onClick={() => removeOneItemCart(item)}
              >
                -
              </button>
            </li>
          ))}
        </ul>
        <div className="cart-totals">
          <h2>Cart Total</h2>
          <hr />
          <h4>Total Amount: ${totalPrice}</h4>
          <div>
            <button onClick={checkout}>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
