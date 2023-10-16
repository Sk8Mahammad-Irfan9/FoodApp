import React, { useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { MdOutlineDinnerDining } from "react-icons/md";
import { MdBreakfastDining } from "react-icons/md";
import { LuDessert } from "react-icons/lu";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

import LunchPage from "../component/LunchPage";
import DinnerPage from "../component/DinnerPage";
import DessertPage from "../component/DessertPage";
import BreakFastPage from "../component/BreakFastPage";
import { useStateHook } from "../store/useStateHook";

import "../css/menuPage.css";
const Menu = () => {
  const { cartCount } = useStateHook();
  console.log(cartCount);

  document.title = "Menu";
  const [currentIndex, setCurrentIndex] = useState(1);
  const toggleTab = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="menu-navbar">
        <img
          src="https://imgs.search.brave.com/IHFD6nFIFPD5vb5S1fI1zVqk6ezzn3xpemQX3w1-BDM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jYXJ0b29uLWlt/YWdlLWNoZWYtaG9s/ZGluZy1oYW1idXJn/ZXJfODk0ODU1LTE5/NDEuanBnP3NpemU9/NjI2JmV4dD1qcGc"
          alt="..."
        />
        <Link to="/Checkout">
          <a href="/Checkout">
            <AiOutlineShoppingCart />
            {cartCount}
          </a>
        </Link>
      </div>
      <div className="menu-items">
        <div className="menu-tabs">
          <div className="menu-container">
            <ul>
              <li
                className={currentIndex === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                <MdBreakfastDining />
              </li>
              <li
                className={currentIndex === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
              >
                <GiKnifeFork />
              </li>
              <li
                className={currentIndex === 3 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(3)}
              >
                <MdOutlineDinnerDining />
              </li>

              <li
                className={currentIndex === 4 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(4)}
              >
                <LuDessert />
              </li>
            </ul>
          </div>
        </div>
        <div className="products-items">
          <div
            className={
              currentIndex === 2 ? "contentt active-content" : "contentt"
            }
          >
            <LunchPage />
          </div>
          <div
            className={
              currentIndex === 3 ? "contentt active-content" : "contentt"
            }
          >
            <DinnerPage />
          </div>
          <div
            className={
              currentIndex === 1 ? "contentt active-content" : "contentt"
            }
          >
            <BreakFastPage />
          </div>
          <div
            className={
              currentIndex === 4 ? "contentt active-content" : "contentt"
            }
          >
            <DessertPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
