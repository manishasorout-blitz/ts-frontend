import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";

import NavbarComp from "./Pages/Navbar/Navbar";

import { AllRoutes } from "./Pages/Routes/AllRoutes";

import Authcontext from "./Pages/Context/Auth";

function App() {
  const { isAuthenticated } = useContext(Authcontext);
  return (
    <div className="App">
      {isAuthenticated ? <NavbarComp /> : ""}

      <AllRoutes />
    </div>
  );
}

export default App;
