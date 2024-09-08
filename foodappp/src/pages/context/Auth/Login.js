import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  document.title="Login - Ristora"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Email or Password is wrong!");
    }
  };

  return (
    <>
    <div className="bg-yellow-700 text-white">
        <Link to="/account" className="text-2xl">
          🠠Go Back
        </Link>
      </div>
      <div className="bg-yellow-700 sm:h-screen flex justify-center items-center p-10">
        <div className="bg-stone-800 sm:h-fill p-5 rounded-lg">
          <div className="grid sm:grid-cols-2 gap-4 p-4">
            <div className="sm:h-full w-full object-cover">
              <img
                src="https://img.freepik.com/premium-photo/cartoon-image-chef-holding-hamburger_894855-1941.jpg?w=826"
                alt="Cheif Logo"
                className="rounded-lg sm:h-96 w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-white">Log In</h2>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col object-cover"
              >
                <label for="email" className="m-2 text-white">
                  Enter Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@name.com"
                  className="rounded-3xl border-none p-2"
                  required
                />
                <label for="password" className="m-2 text-white">
                  Enter Your password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••"
                  className="rounded-3xl border-none p-2"
                  required
                  minLength={8}
                />
                <button className="bg-orange-800 m-4 rounded-lg" type="submit">
                  Submit
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account ?
                  <Link
                    to="/register"
                    className="font-medium text-orange-600 hover:underline dark:text-primary-500"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="sm:h-screen flex justify-center items-center p-10">
        <div className="bg-stone-800 sm:h-fill p-5 rounded-lg border-red-800">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@name.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account yet?
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Login;
