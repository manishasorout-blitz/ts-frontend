import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../Context/Auth";

const PrivateRoute = ({ children }): JSX.Element => {
  const { isAuthenticated } = useContext(Authcontext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
  }, []);

  return children;
};
export default PrivateRoute;
