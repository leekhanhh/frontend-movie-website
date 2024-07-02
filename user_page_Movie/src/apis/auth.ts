import UseCallApi from "../hooks/UseCallApi";

const { UsePost, UseEdit } = UseCallApi();
export const loginApi = (params: object) => {
  const url = "/auth/login";
  return UsePost({ url, params });
};
export const registerApi = (params: object) => {
  const url = "/v1/user/register";
  return UsePost({ url, params });
};
export const sendOTPAPI = (params: object) => {
  const url = "/v1/account/send-otp";
  return UsePost({ url, params });
};
export const checkOTPAPI = (params: object) => {
  const url = "/v1/account/check-OTP";
  return UseEdit({ url, params });
};
export const resetPasswordAPI = (params: object) => {
  const url = "/v1/account/reset-password";
  return UseEdit({ url, params });
};
