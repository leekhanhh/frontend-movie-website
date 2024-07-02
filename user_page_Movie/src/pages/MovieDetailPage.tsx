import React, { useEffect, useMemo, useState } from "react";
import MovieCredit from "../components/movie/MovieCredit";
import MoviePlayer from "../components/movie/MoviePlayer";
import SimilarMovies from "../components/movie/SimilarMovies";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getListFavouriteMovieAllApi,
  getMovieDetailClientApi,
} from "../apis/movie";
import ChatBox from "../components/chat/ChatBox";
import { listAllEpisode } from "../apis/episode";
import Episode from "../components/movie/Episode";
import FavouriteIcon from "../shared/icons/FavouriteIcon";
import {
  createFavoriteMovieApi,
  deleteFavoriteMovieApi,
} from "../apis/favorite";
import { message } from "antd";

import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import {
  createVoteMovieApi,
  deleteVoteMovieApi,
  getListVoteMovieApi,
  getUserVoteMovieApi,
} from "../apis/vote";
import { Flex, Rate } from "antd";
import {
  createRatingMovieApi,
  getRatingScoreMovieApi,
  getUserRatingMovieApi,
} from "../apis/rating";
import { useSearchParams } from "react-router-dom";
import MovieVideos from "../components/movie/MovieVideos";
const MovieDetailPage = (props) => {
  const [value, setValue] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewValue, setViewValue] = useState(true);
  const [linkVideo, setLinkVideo] = useState("");
  const [episode, setEpisode] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const accountProfile = JSON.parse(
    localStorage.getItem("AccountProfile") as string
  );
  const [checkFavourtie, setCheckFavourite] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: createFavouriteMovie } = useMutation({
    mutationKey: ["createFavorite"],
    mutationFn: createFavoriteMovieApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["listFavouriteMovieByAccountId "],
      });
      queryClient.invalidateQueries({ queryKey: ["CheckFavouriteMovie"] });
    },
  });
  const { mutateAsync: deleteFavouriteMovie } = useMutation({
    mutationKey: ["deleteFavorite"],
    mutationFn: deleteFavoriteMovieApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["listFavouriteMovieByAccountId "],
      });
      queryClient.invalidateQueries({ queryKey: ["CheckFavouriteMovie"] });
    },
  });

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const accountId = accountProfile.account.id;

  const { data: movieDetail } = useQuery({
    queryKey: ["movieDetail", id],
    queryFn: () =>
      getMovieDetailClientApi(id).then((res) => {
        console.log(res.data);
        if (res.data.category.id === 2) {
          setLinkVideo(res.data.videoGridFs);
        } else {
          setLinkVideo(res.data.episodes[0].url);
        }
        return res.data;
      }),
  });
  const { data: favouriteMovie } = useQuery({
    queryKey: ["CheckFavouriteMovie"],
    queryFn: () =>
      getListFavouriteMovieAllApi({ accountId: accountId, movieId: id }).then(
        (res) => {
          if (res.data.totalElements > 0) {
            setCheckFavourite(true);
            return res.data.content;
          } else {
            return [];
          }
        }
      ),
  });

  const { data: listEpisode } = useQuery({
    queryKey: ["listEpisode", id],
    queryFn: () =>
      listAllEpisode({ movieId: id }).then((res) => {
        return res.data;
      }),
  });

  const { data: countVote } = useQuery({
    queryKey: ["countVote", id],
    queryFn: () =>
      getListVoteMovieApi(id).then((res) => {
        return res?.data?.totalElements;
      }),
  });
  const { data: checkVote } = useQuery({
    queryKey: ["checkVote", id, accountId],
    queryFn: () =>
      getUserVoteMovieApi(id, accountId).then((res) => {
        console.log(res?.data?.totalElements);
        return res?.data?.totalElements;
      }),
  });
  const { mutateAsync: createVoteMovie } = useMutation({
    mutationKey: [{}, "createVoteMovie"],
    mutationFn: createVoteMovieApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["checkVote"]);
      queryClient.invalidateQueries(["countVote"]);
    },
  });
  const { mutateAsync: deleteVoteMovie } = useMutation({
    mutationKey: ["deleteVoteMovie"],
    mutationFn: (accountId: string, id: string) =>
      deleteVoteMovieApi(accountId, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["checkVote"]);
      queryClient.invalidateQueries(["countVote"]);
    },
  });
  const handleVoteMovie = () => {
    if (checkVote == 0) {
      createVoteMovie({
        accountId: accountId,
        movieId: id,
      });
    } else {
      deleteVoteMovie({ accountId: accountId, id: id });
    }
  };

  const { data: checkRating } = useQuery({
    queryKey: ["checkRating", id, accountId],
    queryFn: () =>
      getUserRatingMovieApi(id, accountId).then((res) => {
        return res?.data?.totalElements;
      }),
  });
  const { mutateAsync: createRatingMovie } = useMutation({
    mutationKey: [{}, "createRatingMovie"],
    mutationFn: createRatingMovieApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["checkRating"]);
    },
  });
  const handleRatingChange = (value) => {
    setValue(value);
    createRatingMovie({
      accountId: accountId,
      movieId: id,
      evaluation: value,
    });
  };
  const { data: ratingScore } = useQuery({
    queryKey: ["ratingScoree", id, accountId],
    queryFn: () =>
      getRatingScoreMovieApi(id).then((res) => {
        return res?.data;
      }),
  });
  const queryParam = useMemo(() => {
    if (movieDetail?.category?.id === 1) {
      return { episode: episode.toString() };
    } else {
      return {};
    }
  }, [episode, id, movieDetail?.category?.id]);
  useEffect(() => {
    setSearchParams(queryParam);
  }, [queryParam]);
  return (
    <div className="flex flex-col gap-8 py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover "
          // style={{
          //   backgroundImage: `url(
          //     https://image.tmdb.org/t/p/original/${backdrop_path}
          //   )`,
          // }}
          style={{
            backgroundImage: `url(https://i.pinimg.com/236x/a2/69/06/a26906e91bee2f22dbcd24b76f3ef5e2.jpg)`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`${movieDetail?.imagePath}`}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <h1 className="mb-10 text-4xl font-bold text-center text-white">
        {movieDetail?.title}
      </h1>
      {movieDetail?.genres.length > 0 && (
        <div className="flex justify-center mb-10 item-center gap-x-5">
          {movieDetail?.genres?.map((item: object) => (
            <span
              key={item.categoryId}
              className="px-4 py-2 transition-all border rounded cursor-pointer border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() =>
                navigate(`/movies?title=&movieGenreId=${item.categoryId}`)
              }
            >
              {item.categoryName}
            </span>
          ))}
        </div>
      )}
      <p className="text-center text-white leading-relaxed max-w-[650px] mx-auto mb-10">
        {movieDetail?.overview}
      </p>
      <MovieCredit></MovieCredit>
      <MovieVideos linkvideo={linkVideo}></MovieVideos>
      {listEpisode?.totalElements > 0 && (
        <div className="flex flex-row items-center gap-4">
          <div className="text-xl text-white">Chapter:</div>
          {listEpisode.content.map((item) => {
            return (
              <Episode
                key={item.id}
                number={item.episodeNumber}
                url={item.url}
                handleChooseEpisode={setEpisode}
                handleChooseLinkvideo={setLinkVideo}
              />
            );
          })}
        </div>
      )}

      <SimilarMovies
        genreId={movieDetail?.genres[0]?.categoryId}
      ></SimilarMovies>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col w-[1000px] h-[150px]  px-2 py-3  gap-4 rounded-md border border-[#ccc] shadow-lg bg-white">
          <div className="flex flex-row items-center justify-between">
            <div className=" w-[100px] h-[30px] bg-blue-500 rounded-lg flex flex-row items-center justify-center gap-2">
              {checkVote == 0 ? (
                <button onClick={() => handleVoteMovie()}>
                  <LikeOutlined
                    style={{
                      fontSize: "16px",
                      color: "#FFFF",
                      cursor: "pointer",
                    }}
                  />
                </button>
              ) : (
                <button onClick={() => handleVoteMovie()}>
                  <LikeFilled
                    type="message"
                    style={{
                      fontSize: "16px",
                      color: "#FFFF",
                      cursor: "pointer",
                    }}
                  />
                </button>
              )}
              <p className="text-base font-semibold text-white">
                Like {countVote}
              </p>
            </div>
            {checkFavourtie ? (
              <div
                className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full cursor-pointer hover:opacity-50 "
                onClick={() => {
                  deleteFavouriteMovie(favouriteMovie[0].id).then(() => {
                    setCheckFavourite(false);
                    message.success("Delete favourite success");
                  });
                }}
              >
                <FavouriteIcon width={20} height={20} color={"#ffd405"} />
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full cursor-pointer hover:opacity-50"
                onClick={() => {
                  createFavouriteMovie({
                    accountId: accountProfile.account.id,
                    movieId: movieDetail.id,
                  }).then(() => {
                    setCheckFavourite(true);
                    message.success("Add favourite success");
                  });
                }}
              >
                <FavouriteIcon width={20} height={20} color={"#fff"} />
              </div>
            )}
          </div>

          <div className="w-[800px] h-[100px] flex flex-col  ">
            <p className="text-xl font-semibold text-black">Rate</p>
            <p className="text-2xl font-semibold text-red-600">
              {ratingScore}{" "}
              <span className="text-base font-semibold text-gray-500">/5</span>
            </p>
            {checkRating == 0 ? (
              <Flex gap="middle" vertical>
                <Rate
                  allowHalf
                  tooltips={desc}
                  onChange={handleRatingChange}
                  value={value}
                />
              </Flex>
            ) : (
              <p className="text-base font-semibold text-gray-600">
                You have already rated!
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="mb-10 text-3xl font-bold text-center text-white ">
          Comment
        </p>
        <ChatBox />
      </div>
    </div>
  );
};

export default MovieDetailPage;
