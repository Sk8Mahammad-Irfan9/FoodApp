import React from "react";
import AboutUs from "./component/AboutUs";
import Menu from "./pages/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
// import Nav from "./component/Nav";
import Checkout from "./pages/Checkout";

const RoutingPath = () => (
  <Router>
  {/* <Nav /> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/menu" element={<Menu />}/>
      <Route path="/Checkout" element={<Checkout />}/>
    </Routes>
  </Router>
);

export default RoutingPath;
