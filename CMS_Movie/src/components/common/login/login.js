import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
// import { Radio } from "antd";
import { Alert } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";


import { motion } from "framer-motion";

import { login } from "../../../actions/userAction";
// import Loading from "../loading/Loading";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  localStorage.removeItem("guestUserInfo");
  localStorage.removeItem("shippingFee");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isCompleted, setIsCompleted] = useState(false);
  const [ErrorNotice, setErrorNotice] = useState(false);
  const [SuccessNotice, setSuccessNotice] = useState(false);
  // const [message, setMessage] = useState("");
  // const [bussinessRole, setBussinessRole] = useState(false);
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { success, loading,error } = userLogin;

  const onSubmit = async (data) => {
    const { username, password } = data;

    dispatch(login(username, password));

    setIsCompleted(true);
    localStorage.setItem(
      "cartProducts",
      "[]"
    );
    localStorage.removeItem("cartCount");
    localStorage.removeItem("lastCartIdUI");
    localStorage.removeItem("shippingFee");
    localStorage.removeItem("orderDetail");
    localStorage.removeItem("existProducts");
    window.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: 0,
      })
    );
  };

  useEffect(() => {
    if (isCompleted) {
      if (success === true) {
        setSuccessNotice(true);
        setErrorNotice(false);
        setTimeout(() => {
          navigate("/menu");
        }, 1000);
      } else if (success === false) {
        // setMessage(error);
        setErrorNotice(true);
        setSuccessNotice(false);
      }
    }
  }, [success, isCompleted, navigate]);

  useEffect(() => {
    if (SuccessNotice || ErrorNotice) {
      const timeout = setTimeout(() => {
        setSuccessNotice(false);
        setErrorNotice(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [SuccessNotice, ErrorNotice]);

  return (
    <div className="w-full h-dvh bg-gradient-to-r from-[#c97e6f] to-[#d55f94] flex justify-center items-start flex-grow lg:mt-20 ">
      {/* {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <Loading />
        </div>
      )} */}
      <div className=" bg-white  mx-auto md:max-w-xl w-4/5 mt-32 text-base shadow-lg rounded-lg border-2 py-8 px-4 mb-10 ">
        <div className="">
          <form className="text-lg" onSubmit={handleSubmit(onSubmit)}>
            {/**user name */}
            <div className="mb-4">
              <label className="block text-lg text-gray-700  font-bold mb-2">
                {t("Username")}
                <input
                  className="text-lg shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  {...register("username", {
                    required: true,
                    minLength: 6,
                    maxLength: 30,
                  })}
                />
              </label>
              {errors.username && (
                <div className="text-red-500">
                  <FontAwesomeIcon icon={faTimesCircle} />
                  <span className="ml-2 italic text-sm">
                    {t("Input from 6 to 30 character")}
                  </span>
                </div>
              )}
            </div>

            {/**Password */}
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2">
                {t("Password")}
                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 64,
                      validate: (value) => !value.includes(" "),
                    })}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showPassword ? (
                      <EyeInvisibleOutlined
                        onClick={toggleShowPassword}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <EyeOutlined
                        onClick={toggleShowPassword}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                </div>
              </label>
              {errors.password && (
                <div className="text-red-500">
                  <FontAwesomeIcon icon={faTimesCircle} />
                  <span className="ml-2 italic text-sm">
                    {t("Input from 6 to 64 character and no blank space")}
                  </span>
                </div>
              )}
            </div>
            <div className="forgot-password mb-6 text-right">
              <Link
                to="/forgot_password"
                className="text-gray-600 text-sm hover:text-gray-400"
              >
                {t("ForgotPassword")}
              </Link>
            </div>
            {/* Button submit */}
            <div className="flex justify-center items-center">
              <div className="w-full md:w-2/3">
                <button
                  className="w-full shadow bg-gradient-to-r from-[#db6c56] to-[#bb457a] hover:bg-[#1890FF] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                  type="submit"
                >
                  {t("Login")}
                </button>
              </div>
            </div>
            <div className="mt-6 md:flex justify-center items-center">
              <p>
                {t("Don't have account ?")}
                <Link to="/register">
                  <span className="text-md ml-2 font-bold text-[#1890FF] cursor-pointer">
                    {t("CreateAccount")}
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="absolute z-50">
        {SuccessNotice === true && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.8 }}
            className="fixed top-32 right-2 md:right-10"
          >
            <Alert
              message={
                <span>
                  <CheckCircleOutlined style={{ color: "Green" }} />{" "}
                  {t("Success")}{" "}
                </span>
              }
              description={t(`Login Successfully`)}
              type="success"
              closable
              onClose={() => setSuccessNotice(false)}
            />
          </motion.div>
        )}
        {ErrorNotice === true && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.8 }}
            className="fixed top-32 right-2 md:right-10"
          >
            <Alert
              message={
                <span>
                  <ExclamationCircleOutlined style={{ color: "red" }} />{" "}
                  {t("Error")}
                </span>
              }
              description={t(`${error}`)}
              // description={t("Invalid username or password")}
              type="error"
              closable
              onClose={() => setErrorNotice(false)}
            />
          </motion.div>
        )}
      </div>
      {/* <div className=" bg-white mx-auto mt-32  shadow-lg rounded-lg border-2 mb-14"> */}

      {/* </div> */}
    </div>
  );
};

export default Login;
