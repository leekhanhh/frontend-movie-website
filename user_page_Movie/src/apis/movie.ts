import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost, UseEdit, UseDelete } = UseCallApi();
export const getListMovieClientApi = (type: string) => {
  let url;
  if (type === "trending") {
    url = "/v1/rating/list-recommending-movie";
  } else if (type === "top_rated") {
    url = "/v1/vote-movie/list-vote-movie";
  } else if (type === "recent") {
    url = "/v1/watched-movie/list-watched-movie-by-accountId";
  } else {
    url = "/v1/movie/list-client";
  }
  // const url = "/v1/movie/list-client";
  return UseGet({ url, requiredToken: true });
};
export const getMovieDetailClientApi = (param: string) => {
  const url = `/v1/movie/get-client/${param}`;
  return UseGet({ url, requiredToken: true });
};
export const getListFavoriteMovieByAccountIdApi = (params) => {
  const url = `v1/favorite-list/list-movie-by-accountId`;
  return UseGet({ url, requiredToken: true, params });
};
export const getListFavouriteMovieAllApi = (params) => {
  const url = `/v1/favorite-list/list`;
  return UseGet({ url, requiredToken: true, params });
};
export const searchMovieApi = (params: object) => {
  const url = "/v1/movie/search-movie";
  return UseGet({ url, requiredToken: true, params });
};
export const listAllMovieApi = (params) => {
  const url = "/v1/movie/list-client";
  return UseGet({ url, requiredToken: true, params });
};
