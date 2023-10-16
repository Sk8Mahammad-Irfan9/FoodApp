import React,{useState,useEffect} from "react";
import "../css/checkout.css";
import { useStateHook } from "../store/useStateHook";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  // const[addToCart,cartCount]=useStateHook()
  // const[cartItems,setCartItems]=useState()
  // const navigate=useNavigate();
  // useEffect(()=>{
  //   const grouped=groupedAndCountObjects(cartCount);
  // })


  return (
    <>
      <h1>This is CheckOut</h1>
      <p>Yo Have 7 orders</p>
      <div className="checkOuts">
        <table className="shop-table">
          <thead>
            <tr>
              <th className="product-remove">1</th>
              <th className="product-remove">2</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sub-total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="product-remove">
                <a href="#No">X</a>
              </td>
              <td className="product-img">
                <img
                  src="https://rstheme.com/products/wordpress/ristora/wp-content/uploads/2019/04/shop_c2.jpg"
                  alt="..."
                />
              </td>
              <td className="product-name">Black-Coffee</td>
              <td
                className="product-price"
                style={{ textAlign: "center", padding: "5px 18px" }}
              >
                40
              </td>
              <td className="product-quantity">
                <div className="quantity" style={{ padding: "5px 18px" }}>
                  <input type="button" defaultValue="-" />
                  <input
                    style={{ width: "40px", textAlign: "center" }}
                    defaultValue="1" disabled={true}
                  />
                  <input type="button" defaultValue="+" />
                </div>
              </td>
              <td className="product-subtotal">
                <span className="subtotal">80</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="cart-totals">
          <h2>Cart Total</h2>
          <hr />
          <table>
            <tbody>
              <tr>
                <th>SubTotal
                <hr />
                </th>
                
                <td>
                  <span>40 <hr /></span>
                </td>
              </tr>
              <tr className="order-Total">
                <th>Total</th>
                <td>
                  <span>40</span>
                </td>
              </tr>
            </tbody>
          </table>
          <button>Order</button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
