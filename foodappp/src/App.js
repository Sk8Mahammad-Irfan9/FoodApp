import "./App.css";
import RoutingPath from "./router";
import React, { useState, useEffect } from "react";
// import { BrowserRouter } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="pre-loader"></div>
      ) : (
        <>
          <RoutingPath />
        </>
      )}
    </>
  );
}

export default App;
