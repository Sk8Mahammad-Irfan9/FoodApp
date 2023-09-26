import React from "react";
import "../css/nav.css";
import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BsPinterest } from "react-icons/bs";
const Nav = () => {
  return (
    <>
      <div className="nav">
        <div className="side-nav">
          <div className="logo">
            <img
              src="https://imgs.search.brave.com/IHFD6nFIFPD5vb5S1fI1zVqk6ezzn3xpemQX3w1-BDM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jYXJ0b29uLWlt/YWdlLWNoZWYtaG9s/ZGluZy1oYW1idXJn/ZXJfODk0ODU1LTE5/NDEuanBnP3NpemU9/NjI2JmV4dD1qcGc"
              alt="..."
            />
          </div>
          <div className="nav-bar">
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#news">News</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <Link to="/aboutus">About</Link>
              </li>
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
      </div>
    </>
  );
};

export default Nav;
