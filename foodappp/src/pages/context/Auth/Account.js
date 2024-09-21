import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./auth";
import toast from "react-hot-toast";
import "../../../css/account.css";

const Account = () => {
  document.title = "Account - Ristora";
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
      <Link to="/" className="text-2xl mb-4">
        🠠 Go Back
      </Link>
      <div className="flex flex-col justify-center items-center text-2xl p-6 sm:max-h-max m-4">
        <h1 className="text-center mb-6">Account</h1>
        <div className="account flex flex-col justify-center items-center p-6 w-full max-w-md">
          {!auth?.token ? (
            <>
              <Link to="/register" className="account-register mb-4">
                Register
              </Link>
              <Link to="/login" className="account-login">
                Login
              </Link>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center p-6">
              <em className="text-black mb-4">Hello: {auth?.user?.name}</em>
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
