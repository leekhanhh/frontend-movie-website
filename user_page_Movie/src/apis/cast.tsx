import UseCallApi from "../hooks/UseCallApi";

const { UseGet } = UseCallApi();

export const getlistCastApi = () => {
  const url = "/v1/participant/list";
  return UseGet({ url, requiredToken: true });
};
