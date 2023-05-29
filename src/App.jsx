import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import RequiereAuth from "./components/RequiereAuth";
import Register from "./components/Register";
import { useContext } from "react";
import { Usercontext } from "./context/UserProvider";

const App = () => {

  const {user} = useContext(Usercontext)

  if(user === false){
    return <p>Loading...</p>
  }

  return (
    <>
      <Navbar />
      <h1>App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <RequiereAuth>
              <Home />
            </RequiereAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
