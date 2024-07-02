import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleCheck,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
import { Alert } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { registerUser } from "../../../actions/userAction";
import "./register.css";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const password = watch("password");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [ErrorNotice, setErrorNotice] = useState(false);
  const [SuccessNotice, setSuccessNotice] = useState(false);
  const navigate = useNavigate();
  const { success, error, loading } = useSelector(
    (state) => state.userRegister
  );
  const [registrationCompleted, setRegistrationCompleted] = useState(false);

  const onSubmit = async (data) => {
    const { name, username, email, password, phone, address } = data;
    dispatch(registerUser(name, username, email, password, phone, address));
    setRegistrationCompleted(true);
  };

  useEffect(() => {
    if (registrationCompleted) {
      if (success) {
        setSuccessNotice(true);
        setErrorNotice(false);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        setErrorNotice(true);
        setSuccessNotice(false);
      }
    }
  }, [success, registrationCompleted, navigate]);

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
    <div className="w-full bg-gradient-to-r from-[#c97e6f] to-[#d55f94] flex justify-center items-start flex-grow">
      <div className="absolute z-50">
        {SuccessNotice && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.8 }}
            className="fixed top-32 right-2 md:right-10"
          >
            <Alert
              message={<span><CheckCircleOutlined style={{ color: "Green" }} /> {t("Success")}</span>}
              description={t(`Register Successfully`)}
              type="success"
              closable
              onClose={() => setSuccessNotice(false)}
            />
          </motion.div>
        )}
        {ErrorNotice && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.8 }}
            className="fixed top-32 right-2 md:right-10"
          >
            <Alert
              message={<span><ExclamationCircleOutlined style={{ color: "red" }} /> {t("Error")}</span>}
              description={t(`${error}`)}
              type="error"
              closable
              onClose={() => setErrorNotice(false)}
            />
          </motion.div>
        )}
      </div>
      <div className="flex pt-28 md:w-1/2 w-full justify-center items-center h-full lg:mt-20 pb-10 ">
        <form className="w-5/6 md:w-2/3 bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("Fullname")}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                {...register("name", { required: true, minLength: 2, maxLength: 30 })}
              />
            </label>
            {isSubmitted && errors.name && (
              <div className="text-red-500">
                <FontAwesomeIcon icon={faTimesCircle} />
                <span className="ml-2 italic text-sm">
                  {t("Input from 2 to 30 character")}
                </span>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("Username")}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                {...register("username", { required: true, minLength: 6, maxLength: 30 })}
              />
            </label>
            {isSubmitted && errors.username && (
              <div className="text-red-500">
                <FontAwesomeIcon icon={faTimesCircle} />
                <span className="ml-2 italic text-sm">
                  {t("Input from 6 to 30 character")}
                </span>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("Email")}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
              />
            </label>
            {isSubmitted && errors.email && (
              <div className="text-red-500">
                <FontAwesomeIcon icon={faTimesCircle} />
                <span className="ml-2 italic text-sm">
                  {t("Email invalid (example@gmail.com)")}
                </span>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("Address")}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                {...register("address", { required: true, minLength: 10, maxLength: 64 })}
              />
            </label>
            {isSubmitted && errors.address && (
              <div className="text-red-500">
                <FontAwesomeIcon icon={faTimesCircle} />
                <span className="ml-2 italic text-sm">
                  {t("Input from 10 to 64 character")}
                </span>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("PhoneNumber")}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                {...register("phone", { required: true, pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/ })}
              />
            </label>
            {isSubmitted && errors.phone && (
              <div className="text-red-500">
                <FontAwesomeIcon icon={faTimesCircle} />
                <span className="ml-2 italic text-sm">
                  {t("Valid phonenumber")}
                </span>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("Password")}
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true, minLength: 6, maxLength: 64, validate: (value) => !value.includes(" ") })}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {showPassword ? (
                    <EyeInvisibleOutlined onClick={toggleShowPassword} style={{ cursor: "pointer" }} />
                  ) : (
                    <EyeOutlined onClick={toggleShowPassword} style={{ cursor: "pointer" }} />
                  )}
                </div>
              </div>
            </label>
            {isSubmitted && errors.password && (
              <div className="text-red-500">
                <FontAwesomeIcon icon={faTimesCircle} />
                <span className="ml-2 italic text-sm">
                  {t("Input from 6 to 64 character and no blank space")}
                </span>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("ConfirmPassword")}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("confirmPassword", { required: true, validate: (value) => value === password })}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {showConfirmPassword ? (
                    <EyeInvisibleOutlined onClick={toggleShowConfirmPassword} style={{ cursor: "pointer" }} />
                  ) : (
                    <EyeOutlined onClick={toggleShowConfirmPassword} style={{ cursor: "pointer" }} />
                  )}
                </div>
              </div>
            </label>
            {isSubmitted && errors.confirmPassword && (
              <div className="text-red-500">
                <FontAwesomeIcon icon={faTimesCircle} />
                <span className="ml-2 italic text-sm">
                  {t("Retype password match")}
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center">
            <div className="w-full md:w-2/3">
              <button
                className="w-full shadow bg-gradient-to-r from-[#db6c56] to-[#bb457a] hover:bg-[#1890FF] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                type="submit"
              >
                {t("Register")}
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-center items-center">
            <p>
              {t("Already have account")}
              <Link to="/login">
                <span className="text-md ml-2 font-bold text-[#1890FF] cursor-pointer">
                  {t("Login")}
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;