import React, { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`/${path}`);
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <h1 className="text-center">Redirect to you in {count} seconds</h1>
      <PropagateLoader
        color="#000000"
        cssOverride={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          height: "100vh",
        }}
        size={20}
        speedMultiplier={1}
      />
    </>
  );
};

export default Spinner;
