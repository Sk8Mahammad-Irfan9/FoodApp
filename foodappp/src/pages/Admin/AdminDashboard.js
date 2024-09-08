import React from "react";
import { useAuth } from "../context/Auth/auth";
import { NavLink } from "react-router-dom";
import "../../css/admin.css"

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <div className="Admin-dashboard">
        <h1>AdminDashboard</h1>

        <div className="admin-details">
          <h3> Admin Name : {auth?.user?.name}</h3>
          <h3> Admin Email : {auth?.user?.email}</h3>
        </div>
        <div>
          <NavLink
            to="/dashboard/admin/all-orders"
            className="list-group-item list-group-item-action bg-yellow-800 user-order"
          >
            User Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
