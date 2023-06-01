import { Outlet } from "react-router-dom";

const LayoutContainerForm = () => {
  return (
    <>
      <div className="w-96 mx-auto mt-10 p-5 rounded-xl bg-green-200">
        <Outlet />
      </div>
    </>
  );
};

export default LayoutContainerForm;
