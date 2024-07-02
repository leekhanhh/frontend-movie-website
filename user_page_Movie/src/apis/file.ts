import UseCallApi from "../hooks/UseCallApi";

const { UsePostFile } = UseCallApi();
export const uploadImageApi = (params: object) => {
  const url = "/v1/file/upload-file/s3";
  return UsePostFile({ url, params, requiredToken: true });
};
