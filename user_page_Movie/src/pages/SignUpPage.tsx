import React from "react";
import PropTypes from "prop-types";
import Googleicon from "../shared/icons/Googleicon";
import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi } from "../apis/auth";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const SignUpPage = (props) => {
  const navigate = useNavigate();
  const { mutateAsync: register } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerApi,
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      avatarPath:
        "https://s3.ap-southeast-1.amazonaws.com/moviewebsite/AVATAR_e8m2M6KT0i.jpg",
      dateOfBirth: dayjs(e.target.elements["dob"].value).format(
        "DD/MM/YYYY HH:mm:ss"
      ),
      email: e.target.elements["email"].value,
      gender: parseInt(e.target.elements["gender"].value),
      password: e.target.elements["password"].value,
      phone: e.target.elements["phone"].value,
      role: 0,
      fullname: e.target.elements["username"].value,
    };
    // console.log(e.target.elements["password"].value);
    register(data).then((res) => {
      navigate("/");
    });
    // console.log(e.target.elements["gender"].value);
  };
  return (
    <div className="bg-white w-[400px] h-max rounded-lg flex flex-col  px-3 py-4 ">
      <div className="flex items-center justify-center w-full border-b border-[#ccc] pb-3">
        <p className="text-3xl font-medium  text-[#0f172a]">Sign up</p>
      </div>
      <div className="flex flex-col gap-3 mt-7">
        <form
          action=""
          className="flex flex-col gap-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="username">User name</label>
            <input
              type="text"
              id="username"
              className="border border-[#ccc] rounded-lg p-2"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="border border-[#ccc] rounded-lg p-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              id="phone"
              className="border border-[#ccc] rounded-lg p-2"
              placeholder="Enter your phone"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="dob">Date of birth</label>
            <input
              type="date"
              id="dob"
              className="border border-[#ccc] rounded-lg p-2"
              placeholder="Enter your dob"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="border border-[#ccc] rounded-lg p-2"
              placeholder="Enter your password"
              id="password"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Gender</p>
            <div className="flex flex-row gap-3">
              <input type="radio" id="Male" name="gender" value="0" />
              <label htmlFor="Male">Male</label>
              <input type="radio" id="Female" name="gender" value="1" />
              <label htmlFor="Female">Female</label>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <button className="bg-[#333] text-white p-2 rounded-lg">
              Sign up
            </button>
          </div>
        </form>
        <div className="flex items-center justify-end">
          <p
            className="text-sm cursor-pointer opacity-40 hover:text-blue-400"
            onClick={() => navigate("/")}
          >
            Already have an account
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

SignUpPage.propTypes = {};

export default SignUpPage;
