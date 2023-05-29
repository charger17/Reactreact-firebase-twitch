import { useContext } from "react";
import { Usercontext } from "../context/UserProvider";
import { Navigate } from "react-router-dom";

const RequiereAuth = ({ children }) => {
  const { user } = useContext(Usercontext);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequiereAuth;
