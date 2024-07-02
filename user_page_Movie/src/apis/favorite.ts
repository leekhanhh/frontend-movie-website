import UseCallApi from "../hooks/UseCallApi";

const { UsePost, UseDelete } = UseCallApi();
export const createFavoriteMovieApi = (params: object) => {
  const url = `/v1/favorite-list/create`;
  return UsePost({ url, params, requiredToken: true });
};
export const deleteFavoriteMovieApi = (params: number) => {
  console.log(params);
  const url = `/v1/favorite-list/delete/${params}`;
  return UseDelete({ url, requiredToken: true });
};
