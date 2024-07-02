import React from "react";
import { useParams } from "react-router";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import { useQuery } from "@tanstack/react-query";
import { listAllMovieApi } from "../../apis/movie";
interface SimilarMoviesProps {
  genreId: number;
}
const SimilarMovies = (props: SimilarMoviesProps) => {
  const { id } = useParams();
  const { data: listSimilarMovie } = useQuery({
    queryKey: ["similarMovies", id, props.genreId],
    queryFn: () =>
      listAllMovieApi({ movieGenreId: props.genreId }).then((res) => {
        if (res.data.totalElements > 0) {
          const tempdata = res.data.content.filter(
            (item) => item.id !== parseInt(id)
          );
          return tempdata;
        } else {
          return [];
        }
      }),
  });

  // console.log("file: MovieDetailsPage.jsx:134 🌇 SimilarMovie 🌇 data:", data);

  return (
    <div className="py-10">
      <h2 className="text-center text-3xl mb-10 font-bold text-white">
        Similar Movie
      </h2>
      <div className="movie-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {listSimilarMovie?.length > 0 &&
            listSimilarMovie.map((item: object) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item} key={item.id}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SimilarMovies;
