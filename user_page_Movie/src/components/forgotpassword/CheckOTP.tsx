import React, { useEffect, useState } from "react";
import { Button, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { checkOTPAPI, sendOTPAPI } from "../../apis/auth";
interface CheckOTPProps {
  email: string;
  handleSetStep: (id: number) => void;
}
const CheckOTP = (props: CheckOTPProps) => {
  const { mutateAsync: checkOTP } = useMutation({
    mutationKey: ["checkOTP"],
    mutationFn: checkOTPAPI,
  });
  const { mutateAsync: sentOTP } = useMutation({
    mutationKey: ["sentOTP"],
    mutationFn: sendOTPAPI,
  });
  const handleSubmit = () => {};
  const [otp, setOtp] = useState<string>("");
  //   const [active, setActive] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const handleOnChange = (value) => {
    // console.log(value);
    // setValue(value);
    // setActive(true);
    // setOtp(value);
    // console.log(props.email);
    checkOTP({ email: props.email, otp: value }).then((res) => {
      if (res.result === true) {
        props.handleSetStep(3);
      } else {
        setError(true);
      }
    });
  };

  return (
    <div className="flex flex-col h-full gap-7 ">
      <p className="text-base ">
        {" "}
        We have sent otp to your email, please check your email to verify!!!
      </p>

      <Input.OTP
        formatter={(str) => str.toUpperCase()}
        onChange={handleOnChange}
        length={6}
      />

      {error && <p className="text-red-500">OTP is incorrect</p>}
      <p
        className="text-[14px] opacity-50 cursor-pointer hover:text-blue-400"
        onClick={() =>
          sentOTP({ email: props.email }).then(() => {
            message.success("OTP sent successfully");
          })
        }
      >
        Don't recieve otp code, resend
      </p>
    </div>
  );
};

export default CheckOTP;
