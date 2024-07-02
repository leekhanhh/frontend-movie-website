import { useNavigate } from "react-router";
import FavouriteIcon from "../../shared/icons/FavouriteIcon";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFavoriteMovieApi,
  deleteFavoriteMovieApi,
} from "../../apis/favorite";
import { message } from "antd";
interface MovieCardProps {
  item: object;
  key: string;
  favouriteId?: number;
  owner?: boolean;
}
const MovieCard = (props: MovieCardProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accountProfile = JSON.parse(
    localStorage.getItem("AccountProfile") as string
  );
  const { mutateAsync: createFavouriteMovie } = useMutation({
    mutationKey: ["createFavorite"],
    mutationFn: createFavoriteMovieApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["listMyFavouriteMovie"] });
      queryClient.invalidateQueries({ queryKey: ["listFavouriteMovie"] });
    },
  });
  const { mutateAsync: deleteFavouriteMovie } = useMutation({
    mutationKey: ["deleteFavorite"],
    mutationFn: deleteFavoriteMovieApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["listMyFavouriteMovie"] });
      queryClient.invalidateQueries({ queryKey: ["listFavouriteMovie"] });
      queryClient.invalidateQueries({
        queryKey: ["listFavouriteMovieByAccountId"],
      });
    },
  });
  return (
    <div className="relative flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      {props.owner && (
        <div
          className="absolute cursor-pointer top-2 right-2 hover:opacity-50"
          onClick={() =>
            deleteFavouriteMovie(props.favouriteId).then(() => {
              message.success("Delete favourite success");
            })
          }
        >
          <FavouriteIcon width={30} height={30} color={"#ffd405"} />
        </div>
      )}

      <img
        src={props?.item?.imagePath}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold ">{props.item.title}</h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>{props.item?.category?.name}</span>
          <span>{props.item.vote_average}</span>
        </div>
        <button
          onClick={() => navigate(`/movie/${props.item.id}`)}
          className="w-full px-6 py-3 mt-auto capitalize rounded-lg bg-primary"
        >
          Watch now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
