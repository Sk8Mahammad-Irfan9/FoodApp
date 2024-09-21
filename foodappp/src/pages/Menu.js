import React, { useEffect, useState } from "react";
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
import useCartStore from "../store/cartStore";

import "../css/menuPage.css";

const Menu = () => {
  document.title = "Menu";
  const [currentIndex, setCurrentIndex] = useState(1);
  const toggleTab = (index) => {
    setCurrentIndex(index);
  };

  const cartCount = useCartStore((state) => state.cartItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Menu...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="menu-nav">
        <Link to="/">
          <div className="menu-navbar"></div>
        </Link>
        <Link to="/Checkout" className="shopping-cart">
          <AiOutlineShoppingCart size={37} />
          <span>{cartCount.length}</span>
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
