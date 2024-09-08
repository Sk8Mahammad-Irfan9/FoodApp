import React, { useState } from "react";
import { useAuth } from "./auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  document.title = "Register - Ristora";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/register`,
        { name, email, password }
      );
      if (name.length > 30) {
        toast.error("Name is too long");
      }
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
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
              <h2 className="text-white">Sign In</h2>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col object-cover"
              >
                <label for="name" className="m-2 text-white">
                  Enter Your name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name (30)"
                  className="rounded-3xl border-none p-2"
                  required
                  maxLength={30}
                />

                <label for="email" className="m-2 text-white">
                  Enter Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
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
                  placeholder="Enter password"
                  className="rounded-3xl border-none p-2"
                  required
                  minLength={8}
                />
                <button className="bg-orange-800 m-4 rounded-lg" type="submit">
                  Submit
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <Link
                    to="/login"
                    className="font-medium text-orange-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
