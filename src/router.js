import React from "react";
import AboutUs from "./component/AboutUs";
import Menu from "./pages/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

const RoutingPath = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/menu" element={<Menu />}/>
      <Route path="/Checkout" element={<Checkout />}/>
      <Route path="/order" element={<Orders />}/>
    </Routes>
  </Router>
);

export default RoutingPath;
