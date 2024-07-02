import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { sendOTPAPI } from "../apis/auth";
import SentOTP from "../components/forgotpassword/SentOTP";
import CheckOTP from "../components/forgotpassword/CheckOTP";
import ResetPassword from "../components/forgotpassword/ResetPassword";

const ForgotPage = () => {
  const [email, setEmail] = useState<string>(""); // Provide the correct type for the state variable
  const [checkStep, setCheckStep] = useState<number>(1); // Provide the correct type for the state variable

  //   const handleSubmit = (e: any) => {
  //     e.preventDefault();
  //     setEmail(e.target.elements["email"].value);
  //     sentOTP({ email: e.target.elements["email"].value })

  //   };
  function handleChangeTab() {
    if (checkStep === 1) {
      return <SentOTP handleSetEmail={setEmail} handleSetStep={setCheckStep} />;
    } else if (checkStep === 2) {
      return <CheckOTP email={email} handleSetStep={setCheckStep} />;
    } else {
      return <ResetPassword email={email} />;
    }
  }
  return (
    <div className="bg-white w-[400px] h-[400px] rounded-lg flex flex-col  px-3 pt-4 ">
      <div className="flex items-center justify-center w-full border-b border-[#ccc] pb-3">
        <p className="text-3xl font-medium  text-[#0f172a]">Forgot password</p>
      </div>
      <div className="flex flex-col h-full gap-3 ">
        {/* <form
          action=""
          className="flex flex-col gap-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              required
              className="border border-[#ccc] rounded-lg p-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <button className="bg-[#333] text-white p-2 rounded-lg">
              send
            </button>
          </div>
        </form> */}
        {handleChangeTab()}
      </div>
    </div>
  );
};

export default ForgotPage;
