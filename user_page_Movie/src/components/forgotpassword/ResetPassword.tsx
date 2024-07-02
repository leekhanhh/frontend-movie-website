import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { resetPasswordAPI } from "../../apis/auth";
import { Button, Result } from "antd";
import { useNavigate } from "react-router";
interface ResetPasswordProps {
  email: string;
}
const ResetPassword = (props: ResetPasswordProps) => {
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mutateAsync: resetPassword, isPending } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: resetPasswordAPI,
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      e.target.elements["newpassword"].value !==
      e.target.elements["confirmnewpassword"].value
    ) {
      setError(true);
    } else {
      resetPassword({
        email: props.email,
        password: e.target.elements["newpassword"].value,
      }).then((res) => {
        if (res.result === true) {
          setSuccess(true);
        }
      });
    }
  };
  return (
    <div className="h-full ">
      {success ? (
        <Result
          status="success"
          title="Successfully reset password!"
          extra={[
            <Button type="primary" onClick={() => navigate("/")}>
              Back to login
            </Button>,
          ]}
        />
      ) : (
        <form
          action=""
          className="flex flex-col justify-center gap-3 mt-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="newpassword">New password</label>
            <input
              type="password"
              id="newpassword"
              required
              className="border border-[#ccc] rounded-lg p-2"
              placeholder="Enter your new password"
            />
            <label htmlFor="confirmnewpassword">Confirm new password</label>
            <input
              type="password"
              id="confirmnewpassword"
              required
              className="border border-[#ccc] rounded-lg p-2"
              placeholder="Enter your new password"
            />
          </div>
          {error && <p className="text-red-500">Password does not match</p>}
          <div className="flex flex-col gap-1 mt-4">
            {/* <button className="bg-[#333] text-white p-2 rounded-lg">
              reset
            </button> */}
            <Button type="primary" htmlType="submit" loading={isPending}>
              Reset
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
