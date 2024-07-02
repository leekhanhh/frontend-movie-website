import UseCallApi from "../hooks/UseCallApi";

const { UsePost, UseDelete, UseGet } = UseCallApi();
export const createVoteMovieApi = (params: object) => {
  const url = `/v1/vote-movie/create-vote`;
  return UsePost({ url, params, requiredToken: true });
};
export const deleteVoteMovieApi = (param: string) => {
  const url = `/v1/vote-movie/delete-vote/${param.accountId}/${param.id}`;
  return UseDelete({ url, requiredToken: true });
};
export const getListVoteMovieApi = (param: string) => {
  const url = `/v1/vote-movie/list-vote?movieId=${param}`;
  return UseGet({ url, requiredToken: true });
};
export const getUserVoteMovieApi = (id: string, accountId: string) => {
  const url = `/v1/vote-movie/list-vote?movieId=${id}&accountId=${accountId}`;
  return UseGet({ url, requiredToken: true });
};
