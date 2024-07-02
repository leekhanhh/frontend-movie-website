import UseCallApi from "../hooks/UseCallApi";

const { UsePost, UseDelete, UseGet } = UseCallApi();
export const createRatingMovieApi = (params: object) => {
  const url = `/v1/rating/create`;
  return UsePost({ url, params, requiredToken: true });
};
export const getUserRatingMovieApi = (id: string, accountId: string) => {
  const url = `/v1/rating/list?movieId=${id}&accountId=${accountId}`;
  return UseGet({ url, requiredToken: true });
};

export const getRatingScoreMovieApi = (id: string) => {
  const url = `/v1/rating/get-rating-score/${id}`;
  return UseGet({ url, requiredToken: true });
};
