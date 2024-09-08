import React, { useState } from "react";
import "../css/nav.css";
import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BsPinterest } from "react-icons/bs";
import { useStateHook } from "../store/useStateHook";
import { useAuth } from "../pages/context/Auth/auth";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Nav = () => {
  const { cartCount } = useStateHook();
  const [auth] = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <>
      <div className={`nav ${isNavOpen ? "nav-open" : ""}`}>
        <div className="menu-icon" onClick={toggleNav}>
          <IoIosMenu />
        </div>

        <div className={`side-nav ${isNavOpen ? "side-nav-open" : ""}`}>
          <div className="close-icon" onClick={toggleNav}>
            <IoMdClose />
          </div>
          <div className="icon-logo">
            <div className="logo"></div>
          </div>
          <div className="nav-bar">
            <ul>
              {auth?.user && (
                <em className="text-white">Hello : {auth.user.name}</em>
              )}
              <Link to="/" onClick={toggleNav}>
                <li>Home</li>
              </Link>
              <Link to="#" onClick={toggleNav}>
                <li>News</li>
              </Link>
              <Link to="#" onClick={toggleNav}>
                <li>Contact</li>
              </Link>
              <a href="#about" onClick={toggleNav}>
                <li>About</li>
              </a>
              <Link to="/Checkout" onClick={toggleNav}>
                <li>Checkout{cartCount}</li>
              </Link>
              <Link to="/account" onClick={toggleNav}>
                <li>Account</li>
              </Link>
            </ul>
          </div>

          <div className="social-media">
            <div className="contact">
              <a href="#">(+91) 1234-567-890</a>
            </div>
            <div className="social">
              <a href="#">
                <AiFillFacebook />
              </a>
              <a href="#">
                <RiTwitterXLine />
              </a>
              <a href="#">
                <BsPinterest />
              </a>
              <a href="#">
                <BiLogoInstagramAlt />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
