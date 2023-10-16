import React from "react";
import "../css/menu.css";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <>
      <div className="bg-menu">
        <div className="menu">
          <div className="menu-txt">
            <div className="menu-context">
              <h3>Our</h3>
              <h2>TODAY'S MENUS</h2>
            </div>
          </div>
          <div className="menu-desc">
            <p>
              Ristora is a restaurant, bar and coffee roastery located on a busy
              corner site in Farringdon's Exmouth Market. With glazed frontage
              on two sides of the building, overlooking the market and a
              bustling London intersec in certain circumstances and owing to the
              claims.
            </p>
          </div>
          <div className="butn">
            <Link to="/menu" ><button>View all menu</button></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
