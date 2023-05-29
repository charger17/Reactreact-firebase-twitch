import { useContext, useState } from "react";
import { Usercontext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123123");

  const navigate = useNavigate();
  const { registerUser } = useContext(Usercontext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Procesando form", email, password);
    try {
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingrese email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ingrese Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
