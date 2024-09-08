import React from "react";
import AboutUs from "./component/AboutUs";
import Menu from "./pages/Menu";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Pagenotfound from "./pages/Pagenotfound";
import Account from "./pages/context/Auth/Account";
import Register from "./pages/context/Auth/Register";
import Login from "./pages/context/Auth/Login";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOrder from "./pages/Admin/AdminOrder";

const RoutingPath = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/Checkout" element={<Checkout />} />
      <Route path="/order" element={<Orders />} />
      <Route path="/account" element={<Account />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Pagenotfound />} />

      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/all-orders" element={<AdminOrder />} />
      </Route>
    </Routes>
  </>
);

export default RoutingPath;
