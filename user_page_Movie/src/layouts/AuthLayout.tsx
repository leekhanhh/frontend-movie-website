import React from "react";

import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className=" h-screen  grid grid-flow-col grid-cols-[50%_50%] bg-slate-900 font-body ">
      <div className="w-full h-full bg-center bg-no-repeat bg-cover bg-AuthBanner hover:blur-sm">
        {/* <img
          src="https://i.pinimg.com/736x/15/88/80/158880677337554c534c5087114d1619.jpg"
          alt=""
          className="w-full h-full "
        /> */}
      </div>
      <div className="flex items-center justify-center ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
