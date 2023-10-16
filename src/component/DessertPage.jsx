import React from "react";
import dessertIems from "../products/dessertItems";
// import "./css/lunch.css";
import { useStateHook } from "../store/useStateHook";
import { BsFillCartPlusFill } from "react-icons/bs";

const DessertPage = ({ data }) => {
  const { addToCart } = useStateHook();
  const handleAddToCart = () => {
    addToCart(data);
  };
  return (
    <div className="lunch">
      <div className="lunch-container">
        <div className="grid-container">
          {dessertIems.map((item, index) => (
            <div className="grid-item" key={index}>
              <img src={item.img} alt="..." />
              <div className="details">
                <h3>{item.title}</h3>
                <p className="product-price">{item.desc}</p>
                <p className="product-price">${item.price}</p>
                <button onClick={handleAddToCart}>
                  <BsFillCartPlusFill />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DessertPage;
