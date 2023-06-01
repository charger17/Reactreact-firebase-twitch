import { useContext } from "react";
import { Usercontext } from "../../context/UserProvider";
import { Navigate, Outlet } from "react-router-dom";

const LayoutRequiereAuth = () => {
  const { user } = useContext(Usercontext);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="container mx-auto">
      <Outlet/>
      </div>
    </>
  );
};

export default LayoutRequiereAuth;
