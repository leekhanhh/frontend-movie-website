import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost, UseEdit, UseDelete } = UseCallApi();
export const getUserProfileApi = (param: string) => {
  const url = `/v1/user/get/${param}`;
  return UseGet({ url, requiredToken: true });
};
export const getProfileApi = () => {
  const url = `/v1/user/my-profile`;
  return UseGet({ url, requiredToken: true });
};
export const updateProfileApi = (params) => {
  const url = `/v1/user/update`;
  return UseEdit({ url, requiredToken: true, params });
};
