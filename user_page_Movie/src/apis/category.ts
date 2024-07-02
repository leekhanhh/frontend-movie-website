import UseCallApi from "../hooks/UseCallApi";

const { UseGet } = UseCallApi();
export const listAllCategoryApi = (params) => {
  const url = `/v1/category/list`;
  return UseGet({ url, requiredToken: true, params });
};
