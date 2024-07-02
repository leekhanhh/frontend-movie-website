import React, { useState } from "react";
import PropTypes from "prop-types";
import Googleicon from "../shared/icons/Googleicon";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../apis/auth";
import { useNavigate } from "react-router";
import UseCookie from "../hooks/UseCookie";
import { message } from "antd";

const SignInPage = (props) => {
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState("");
  const { saveToken, removeToken, getToken } = UseCookie();
  const { mutateAsync: Login } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginApi,
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      email: e.target.elements["email"].value,
      password: e.target.elements["password"].value,
    };

    Login(data).then((res) => {
      if (res.result === true) {
        removeToken();
        saveToken(res.data.token, res.data.token);
        navigate("/home");
      } else {
        setErrorState("wrong email or password");
      }
    });
  };
  return (
    <div className="bg-white w-[400px] h-[500px] rounded-lg flex flex-col  px-3 pt-4 ">
      <div className="flex items-center justify-center w-full border-b border-[#ccc] pb-3">
        <p className="text-3xl font-medium  text-[#0f172a]">Login</p>
      </div>
      <div className="flex flex-col gap-3 mt-7">
        <form
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
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              className="border border-[#ccc] rounded-lg p-2"
              placeholder="Enter your password"
            />
            <p className="text-red-500 ">{errorState}</p>
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <button className="bg-[#333] text-white p-2 rounded-lg">
              Login
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between">
          <p
            className="text-sm cursor-pointer opacity-40 hover:text-blue-400"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </p>
          <p
            className="text-sm cursor-pointer opacity-40 hover:text-blue-400"
            onClick={() => navigate("/forgotpassword")}
          >
            Forgot password
          </p>
        </div>
        <div className="flex flex-row justify-between w-full gap-3">
          <div className=" border-b w-full border-[#ccc]"></div>
          <div className=""> or</div>
          <div className=" border-b w-full border-[#ccc]"></div>
        </div>
        <div className="bg-[#333] mt-4 text-white p-2 rounded-lg w-full flex flex-row gap-2 justify-center cursor-pointer">
          <div className="flex items-center justify-center ">
            <Googleicon />
          </div>
          <p>login by Google</p>
        </div>
      </div>
    </div>
  );
};

SignInPage.propTypes = {};

export default SignInPage;
