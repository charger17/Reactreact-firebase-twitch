import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Usercontext } from "../context/UserProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(Usercontext);

  const handleClickLogOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <>
      <div>
        {user ? (
          <>
            <NavLink to="/">Inicio</NavLink>
            <button onClick={handleClickLogOut}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
