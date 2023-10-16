import "./App.css";
import RoutingPath from "./router";
import React, { useState, useEffect } from "react";
// import PulseLoader from "react-spinners/PulseLoader";
// import { Hourglass } from  'react-loader-spinner'
function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="pre-loader">
          <img
            src="https://rstheme.com/products/wordpress/ristora/wp-content/uploads/2019/03/preloader.gif"
            alt="..."
          />
        </div>
      ) : (
        <RoutingPath />
      )}
    </>
  );
}

export default App;
