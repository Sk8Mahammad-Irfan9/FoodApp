import React from "react";
import dessertIems from "../products/dessertItems";
// import "./css/lunch.css";

const DessertPage = () => {
  return (
    <div className="lunch">
      <div className="lunch-container">
        <div className="grid-container">
          {dessertIems.map((item, index) => (
            <div className="grid-item" key={index}>
              <img src={item.img} alt="..." />
              <div className="details">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <p>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DessertPage;
