import { useMutation } from "@tanstack/react-query";
import React from "react";
import { sendOTPAPI } from "../../apis/auth";
import { useNavigate } from "react-router";
import { Button, message } from "antd";
interface SentOTPProps {
  handleSetStep: (id: number) => void;
  handleSetEmail: (email: string) => void;
}
const SentOTP = (props: SentOTPProps) => {
  const { mutateAsync: sentOTP, isPending } = useMutation({
    mutationKey: ["sentOTP"],
    mutationFn: sendOTPAPI,
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    sentOTP({ email: e.target.elements["email"].value }).then((res) => {
      if (res.result === false) {
        message.error(" Email not found");
      } else {
        props.handleSetEmail(e.target.elements["email"].value);
        props.handleSetStep(2);
      }
    });
  };
  const navigate = useNavigate();
  return (
    <form
      action=""
      className="flex flex-col justify-center h-full gap-3"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          className="border border-[#ccc] rounded-lg p-2"
          placeholder="Enter your email"
        />
      </div>

      <div className="flex flex-col gap-1 mt-4">
        {/* <button className="bg-[#333] text-white p-2 rounded-lg">send</button> */}
        <Button type="primary" loading={isPending} htmlType="submit">
          Send
        </Button>
      </div>
      <div className="flex flex-row justify-end">
        <p
          className="text-base opacity-50 cursor-pointer hover:text-blue-400 "
          onClick={() => {
            navigate("/");
          }}
        >
          back to login
        </p>
      </div>
    </form>
  );
};

export default SentOTP;
