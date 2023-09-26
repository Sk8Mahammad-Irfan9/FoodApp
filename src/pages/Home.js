import React from "react";
import Nav from "../component/Nav";
// import "../css/nav.css";
import "../css/home.css";
import TypeAnime from "../components/TypeAnime";
import AboutUs from "../component/AboutUs";
import Menu from "../component/Menu";

const Home = () => {
  return (
    <>
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
          {/* Also redirect to menu items */}
          <div className="btn">
            <button>Get Started Now</button>
          </div>
        </div>
      </div>
      <AboutUs />
      <Menu />
    </>
  );
};

export default Home;
