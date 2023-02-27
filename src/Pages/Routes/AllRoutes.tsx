// import { Switch } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";

import CreateNewBill from "../Create/Create";
import EditBill from "../Edit/Edit";
import Home from "../Home/Home";
import Login from "../Login/Login";
import SignUp from "../Signup/Signup";
import PrivateRoute from "./PrivateRoutes";

export function AllRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <EditBill />
          </PrivateRoute>
        }
      />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreateNewBill />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
