import React, { useState, useEffect } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import axios from "axios";
import useCartStore from "../store/cartStore";

const DinnerPage = ({ data }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getDinner")
      .then((items) => setItems(items.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="lunch">
        <div className="lunch-container">
          <div className="grid-container">
            {items.map((item) => (
              <div className="grid-item" key={item.id}>
                <img src={item.img} alt="..." />
                <div className="details">
                  <h3>{item.title}</h3>
                  <p className="product-price">{item.desc}</p>
                  <p className="product-price">${item.price}</p>
                  <button onClick={() => addToCart(item)}>
                    <BsFillCartPlusFill />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DinnerPage;
