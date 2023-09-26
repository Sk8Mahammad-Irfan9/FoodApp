import React from "react";
import AboutUs from "./component/AboutUs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

const RoutingPath = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
    </Routes>
  </Router>
);

export default RoutingPath;
