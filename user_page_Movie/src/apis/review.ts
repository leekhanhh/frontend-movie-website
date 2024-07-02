import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost, UseEdit, UseDelete } = UseCallApi();
export const createCommentApi = (params: object) => {
  const url = "/v1/review/create";
  return UsePost({ url, requiredToken: true, params });
};
export const editCommentApi = (params: object) => {
  const url = "/v1/review/update";
  return UseEdit({ url, requiredToken: true, params });
};
export const deleteCommentApi = (id: number) => {
  const url = `/v1/review/delete/${id}`;
  return UseDelete({ url, requiredToken: true });
};
export const getListCommentByIdApi = (id: string) => {
  const url = `/v1/review/list-movie/${id}`;
  return UseGet({ url, requiredToken: true });
};
export const createReactionCommentApi = (params: object) => {
  const url = "/v1/liked-reviews/create";
  return UsePost({ url, requiredToken: true, params });
};
export const deleteReactionCommentApi = (id: number) => {
  const url = `/v1/liked-reviews/delete/${id}`;
  return UseDelete({ url, requiredToken: true });
};
export const getListReactionByMovieIdApi = (params: object) => {
  const url = `/v1/liked-reviews/list-by-accountId-token`;
  return UseGet({ url, requiredToken: true, params });
};
