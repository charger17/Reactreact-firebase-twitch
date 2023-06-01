import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Perfil from "./routes/Perfil";
import NotFound from "./routes/NotFound";

import Navbar from "./components/Navbar";
import ButtonLoading from "./components/ButtonLoading";
import LayoutRequiereAuth from "./components/layouts/LayoutRequiereAuth";
import LayoutContainerForm from "./components/layouts/LayoutContainerForm";

import { useContext } from "react";
import { Usercontext } from "./context/UserProvider";

const App = () => {
  const { user } = useContext(Usercontext);

  if (user === false) {
    return <ButtonLoading />;
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<LayoutRequiereAuth />}>
          {["/", "/home"].map((path, index) => {
            return <Route path={path} element={<Home />} key={index} />;
          })}
          {/* <Route index path="/" element={<Home />} /> */}
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
