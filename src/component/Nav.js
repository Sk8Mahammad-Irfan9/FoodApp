import React from "react";
import "../css/nav.css";
import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BsPinterest } from "react-icons/bs";
import { useStateHook } from "../store/useStateHook";

const Nav = () => {
  const { cartCount } = useStateHook();

  return (
    <>
      <div className="nav">
        <div className="side-nav">
          <div className="logo">
           
          </div>
          <div className="nav-bar">
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <li>News</li>
              <li>
                Contact
              </li>
              <li>
                About
              </li>
              <Link to="/Checkout">
                <li>
                  Checkout{cartCount.lenght}
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="social-media">
          <div className="contact">
            <a href="/">(+91) 1234-567-890</a>
          </div>
          <div className="social">
            <a href="/">
              <AiFillFacebook />
            </a>
            <a href="/">
              <RiTwitterXLine />
            </a>
            <a href="/">
              <BsPinterest />
            </a>
            <a href="/">
              <BiLogoInstagramAlt />
            </a>
          </div>
        </div>
        {/* <a href="javascript:void(0);" style="font-size:15px;" className="icon" onClick={{myFunction()}}>&#9776;</a> */}
      </div>
    </>
  );
};

export default Nav;
