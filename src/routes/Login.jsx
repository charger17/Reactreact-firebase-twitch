import { useContext } from "react";
import { Usercontext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, setUser } = useContext(Usercontext);
  const navigate = useNavigate();
  const handleClickLogin = () => {
    setUser(true);
    navigate("/");
  };
  return (
    <>
      <h1>Login</h1>
      <h2>{user ? "en linea" : "offline"}</h2>
      <button onClick={handleClickLogin}>Acceder</button>
    </>
  );
};

export default Login;
