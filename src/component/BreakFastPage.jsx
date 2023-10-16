import React from "react";
import breakfastItems from "../products/breakfastItems";
// import "./css/lunch.css";
import { useStateHook } from "../store/useStateHook";
import {BsFillCartPlusFill} from 'react-icons/bs'

const BreakFastPage = ({ data }) => {
  const { addToCart } = useStateHook();
  const handleAddToCart = () => {
    addToCart(data);
  };
console.log(addToCart)
  return (
    <div className="lunch">
      <div className="lunch-container">
        <div className="grid-container">
          {breakfastItems.map((item, index) => (
            <div className="grid-item" key={index}>
              <img src={item.img} alt="..." />
              <div className="details">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <p>${item.price}</p>
                <button onClick={handleAddToCart}>add to cart<BsFillCartPlusFill /> </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakFastPage;
