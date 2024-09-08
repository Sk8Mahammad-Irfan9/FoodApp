import React from "react";
import Nav from "../component/Nav";
import "../css/home.css";
import TypeAnime from "../components/TypeAnime";
import AboutUs from "../component/AboutUs";
import Menu from "../component/Menu";
import { Link } from "react-router-dom";
import { useAuth } from "./context/Auth/auth";

const Home = () => {
  document.title = "Ristora";
  return (
    <>
      <div>
        <Nav />
        <div className="main-content">
          <div className="welcome">
            <div className="welcome-context">
              <h3>Spicy & Delicious</h3>
              <h2>WELCOME TO RISTORA</h2>
            </div>
            <div className="type">
              <h3>Enjoy our</h3>
              <div className="typeAnime">
                <TypeAnime />
              </div>
            </div>
            <div className="btn">
              <Link to="/menu">
                <button>Get Started Now</button>
              </Link>
            </div>
          </div>
        </div>
        <AboutUs />
        <Menu />
        <footer
          style={{ textAlign: "center", fontSize: "16px", fontWeight: "500" }}
        >
          &copy; 2023 All Rights Reserved
        </footer>
      </div>
    </>
  );
};

export default Home;
