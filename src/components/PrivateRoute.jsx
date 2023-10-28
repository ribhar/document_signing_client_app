import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../utils/verifySessionToken";

const PrivateRoute = ({ element }) => {
  const isLoggedIn = getAuthToken()
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
     return navigate("/login");
    //   return null;
    }
  }, [isLoggedIn]);

  return element;
};

export default PrivateRoute;
