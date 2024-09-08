import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./auth";
import toast from "react-hot-toast";
import "../../../css/account.css"

const Account = () => {
  document.title="Account - Ristora"
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <Link to="/" className="text-2xl ">
        🠠Go Back
      </Link>
      <div className="flex justify-center items-center text-2xl sm:max-h-max p-10 m-10 flex-col">
        <h1>Account</h1>
        <div className="account flex justify-center items-center flex-col p-6">
          {!auth?.token ? (
            <>
              <Link to="/register" className="account-register" >Register</Link>
              <Link to="/login" className="account-login">Login</Link>
            </>
          ) : (
            <div className="flex justify-center items-center flex-col p-6">
              <em className="text-black">Hello : {auth?.user?.name}</em>
              <Link to="/" onClick={handleLogout} className="account-logout">
                Log Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
