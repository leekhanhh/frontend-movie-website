import UseCallApi from "../hooks/UseCallApi";

const { UseGet } = UseCallApi();
export const listAllEpisode = (params) => {
  const url = `/v1/episode/get-episode-list-by-movie`;
  return UseGet({ url, requiredToken: true, params });
};
